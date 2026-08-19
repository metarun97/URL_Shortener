// Imported items:-
import jwt from "jsonwebtoken";

// authenticationPass for pass the authenticated user:-
export const authPassByRefreshToken = async (req, res, next) => {
  const refreshToken = req?.cookies?.refreshToken;

  // If token not found:-
  if (!refreshToken) {
    return res.status(404).json({
      message: "Unotherized: refreshToken not found",
    })
  }

  try {
    // Verify token and get user data and pass data to req.user:-
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // set user as decoded data:-
    const user = decoded;

    // assing the value or user to req.user:-
    req.user = user;

    // proceed to next step:-
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unotherized",
    })
  }
}

