import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// registerUser API Controller:-
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, fullName: { firstName, lastName } } = req.body;

    // Find user by username and email:-
    const existingUser = await userModel.findOne({
      $or: [{ name }, { email }],
    });

    // If user already exists:-
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    // Make password hash:-
    const hash = await bcrypt.hash(password, 10);

    // Create a new user for regsiter:-
    const user = await userModel.create({
      name,
      email,
      password: hash,
      fullName: {
        firstName, lastName
      }
    });

    // Give token to register user:-
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Save token in browser's cookies:-
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000   // 1 day
    })

    // Final response:-
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        fullName: user.fullName
      },
    });
  } catch (error) {
    // console.error('Register error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


// loginUser API Controller:-
export const loginUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Find user by name and email:-
    const user = await userModel.findOne({
      $or: [
        { name },
        { email },
      ]
    }).select("+password");

    // If user not found:-
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }
    // If user found then check password matched or not:-
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If password not matched:-
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // Give a token to login user:-
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Save token for the login user:-
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,      // 1day
    });

    // Final response:-
    return res.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

// meUser API Controller:-
export const meUser = async (req, res) => {

  // Final response to find user:-
  res.status(200).json({
    message: "User fetched successfully.",
    user: req.user,
  })
}

// logoutUser API Controller:-
export const logoutUser = async (req, res) => {
  try {
    // Clear cookie form the browser:-
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    })

    // Final response:-
    res.status(200).json({
      message: "User logout successfully",
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    })
  }
}
