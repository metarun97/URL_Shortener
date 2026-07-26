// Imported items:-
import jwt from "jsonwebtoken";


export const authenticationExcess = async (req, res, next) => {
  const token = req.cookies.token;

  // If token not found:-
  if (!token) {
    return res.status(401).json({
      message: "Unotherized: Token not found",
    })
  }

  try {
    // Verify token and get user data and pass data to req.user:-
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = decoded;

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unotherized",
    })
  }





}
