const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Get token from header

  if (!token) {
    return res.status(403).json({ msg: "Access denied, token missing" });
  }

  try {
    // Verify token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId and roles to req.user
    req.user = { userId: decoded.userId, roles: decoded.roles };

    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
