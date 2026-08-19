/* Imported items */
import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateGravatarUrl from '../utils/gravetar.js';


const getAccessTokenSecret = () =>
  process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;

const getRefreshTokenSecret = () =>
  process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;

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
    const accessToken = jwt.sign({ id: user._id }, getAccessTokenSecret(), { expiresIn: "15m" });

    // Give refreshToken to registered user:-
    const refreshToken = jwt.sign({ id: user._id }, getRefreshTokenSecret(), { expiresIn: "7d" });

    // Save accessToken in browser's cookies:-
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000   // 15 minutes
    })

    // Save refreshToken in browser's cookies:-
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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
    const accessToken = jwt.sign({ id: user._id },
      getAccessTokenSecret(),
      { expiresIn: "15m" });

    // Give refreshToken to login user:-
    const refreshToken = jwt.sign({ id: user._id },
      getRefreshTokenSecret()
      , { expiresIn: "7d" });

    // Get accessToken in browser's cookies:-
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000   // 15 minutes
    })

    // Get refreshToken in browser's cookies:-
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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
  try {
    const userId = req.user?.id;

    const user = await userModel.findById(userId);

    // If user not found:-
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
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// logoutUser API Controller:-
export const logoutUser = async (req, res) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({
        success: true,
        message: "accessToken/refreshTheToken not fond",
      });
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    // Clear accessToken and refreshToken from the HTTP cookies.
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    return res.status(200).json({
      message: "User logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// refreshTheToken API Controller:-
export const refreshTheToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Check refresh token availability:-
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    // Verify refreshTheToken:=
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Create new accessToken:-
    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    // Save new accessToken in http cookies:-
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    // Final response:=
    res.status(200).json({
      message: "Access token refreshed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
