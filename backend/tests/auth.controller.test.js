import { jest } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import userModel from '../src/models/user.model.js';
import { registerUser, loginUser, meUser, logoutUser } from '../src/controllers/auth.controller.js';

let mongoServer;

beforeAll(async () => {
  process.env.JWT_SECRET = 'test-secret';
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await userModel.deleteMany({});
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const buildRes = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
    clearCookie: jest.fn().mockReturnThis(),
  };
  return res;
};

describe('auth controller', () => {
  it('registers a new user and returns 201 with user data', async () => {
    const req = {
      body: {
        name: 'Alice',
        email: 'alice@example.com',
        password: 'secret123',
      },
    };
    const res = buildRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'User registered successfully',
        user: expect.objectContaining({
          name: 'Alice',
          email: 'alice@example.com',
        }),
      })
    );
    expect(res.cookie).toHaveBeenCalled();
    const savedUser = await userModel.findOne({ email: 'alice@example.com' });
    expect(savedUser).not.toBeNull();
  });

  it('returns 409 when the user already exists', async () => {
    await userModel.create({
      name: 'Bob',
      email: 'bob@example.com',
      password: 'hashedpw',
    });

    const req = {
      body: {
        name: 'Bob',
        email: 'bob@example.com',
        password: 'anotherpass',
      },
    };
    const res = buildRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });

  it('logs in an existing user and returns 200', async () => {
    const hashedPassword = await import('bcryptjs').then((m) => m.default.hash('secret123', 10));
    await userModel.create({
      name: 'Carol',
      email: 'carol@example.com',
      password: hashedPassword,
    });

    const req = {
      body: {
        email: 'carol@example.com',
        password: 'secret123',
      },
    };
    const res = buildRes();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'User logged in successfully',
        user: expect.objectContaining({
          email: 'carol@example.com',
        }),
      })
    );
    expect(res.cookie).toHaveBeenCalled();
  });

  it('returns 401 for invalid login credentials', async () => {
    const hashedPassword = await import('bcryptjs').then((m) => m.default.hash('correctpass', 10));
    await userModel.create({
      name: 'Dan',
      email: 'dan@example.com',
      password: hashedPassword,
    });

    const req = {
      body: {
        email: 'dan@example.com',
        password: 'wrongpass',
      },
    };
    const res = buildRes();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credential:Password not matched' });
  });

  it('returns the current user from req.user', async () => {
    const req = { user: { id: '123', name: 'Eve', email: 'eve@example.com' } };
    const res = buildRes();

    await meUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User fetched successfully.',
      user: req.user,
    });
  });

  it('clears the auth cookie on logout', async () => {
    const req = {};
    const res = buildRes();

    await logoutUser(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith('token', {
      httpOnly: true,
      secure: true,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User logout successfully' });
  });
});
