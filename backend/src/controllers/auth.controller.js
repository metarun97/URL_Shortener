import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateGravatarUrl from '../utils/gravetar.js';


// registerUser API Controller:-
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

    // gravatar created:-
    const gravatarCreated = generateGravatarUrl(email)

    // Create a new user for regsiter:-
    const user = await userModel.create({
      name,
      email,
      password: hash,
      avatar: gravatarCreated,
    });

    // Give token to registered user:-
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Save token in browser's cookies:-
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000   // 1 hour
    })

    // Final response:-
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
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
    const { email, password } = req.body;

    // Find user by name and email:-
    const user = await userModel.findOne({ email }).select("+password");

    // If user not found:-
    if (!user) {
      return res.status(401).json({
        message: 'Invalid User: Email not found',
      });
    }

    // If user found then check password matched or not:-
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If password not matched:-
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: 'Invalid credential: Email or Password not matched'
      });
    }

    // Give a token to login user:-
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Save token for the login user:-
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000   // 1 hour
    });

    // Final response:-
    res.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// meUser API Controller:-
export const meUser = async (req, res) => {

  const userId = req.user.id;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    })
  }

  // Final response to find user:-
  res.status(200).json({
    message: "User fetched successfully.",
    data: user,
  })
}

// logoutUser API Controller:-
export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({
        message: "Login user not found"
      })
    }

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
      message: error.message,
    })
  }
}
