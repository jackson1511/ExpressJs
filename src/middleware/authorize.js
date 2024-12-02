// middleware/authorize.js
const authorize = (requiredRoles = []) => {
  // Ensure that the requiredRoles is an array
  if (typeof requiredRoles === "string") {
    requiredRoles = [requiredRoles];
  }

  return (req, res, next) => {
    const { roles } = req.user; // Access roles from the JWT payload

    // Check if the user's roles intersect with the requiredRoles
    const hasRole = roles.some((role) => requiredRoles.includes(role));

    if (!hasRole) {
      return res
        .status(403)
        .json({ msg: "You do not have permission to access this resource" });
    }

    next(); // Proceed to the next middleware or route handler
  };
};

module.exports = authorize;
