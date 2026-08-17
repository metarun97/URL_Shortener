/* Imported items */
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

    // Give accessToken to registered user:-
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

    // Give refreshToken to registered user:-
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    // Save accessToken in browser's cookies:-
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000   // 15 minutes
    })

    // Save refreshToken in browser's cookies:-
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000   // 7 days
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
    return res.status(500).json({
      message: error.message
    });
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
        message: 'Invalid Email: User not found',
      });
    }

    // If user found then check password matched or not:-
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If password not matched:-
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: 'Invalid credential: Password not matched'
      });
    }

    // Give accessToken to login user:-
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

    // Give refreshToken to login user:-
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    // Get refreshToken in browser's cookies:-
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000   // 7 days
    })
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
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(404).json({
        message: "Login user not found"
      })
    }

    // Clear cookie form the browser:-
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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
