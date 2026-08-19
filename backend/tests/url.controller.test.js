import { jest } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import urlModel from '../src/models/url.model.js';
import '../src/models/user.model.js';
import { getAllUsersUrl } from '../src/controllers/url.controller.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await urlModel.deleteMany({});
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const buildRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
});

describe('getAllUsersUrl controller', () => {
  it('returns only the urls belonging to the authenticated user', async () => {
    const userId = new mongoose.Types.ObjectId();
    const otherUserId = new mongoose.Types.ObjectId();

    await urlModel.create([
      { full_url: 'https://example.com/one', short_url: 'abc123', user: userId, clicks: 1 },
      { full_url: 'https://example.com/two', short_url: 'def456', user: otherUserId, clicks: 2 },
    ]);

    const req = {
      user: { id: userId.toString() },
    };
    const res = buildRes();

    await getAllUsersUrl(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        count: 1,
        urls: expect.any(Array),
      })
    );

    const response = res.json.mock.calls[0][0];
    expect(response.urls[0].short_url).toBe('abc123');
  });
});
