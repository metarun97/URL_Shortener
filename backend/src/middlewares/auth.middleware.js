// Imported items:-
import jwt from "jsonwebtoken";

// authenticationPass for pass the authenticated user:-
export const authenticationPass = async (req, res, next) => {
  const token = req.cookies.token;

  // If token not found:-
  if (!token) {
    return res.status(404).json({
      message: "Unotherized: Token not found",
    })
  }

  try {
    // Verify token and get user data and pass data to req.user:-
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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

