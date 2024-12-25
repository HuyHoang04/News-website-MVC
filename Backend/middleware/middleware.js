import jwt from "jsonwebtoken";

export const middleware = {
  verifyRole: (roles) => (req, res, next) => {
    const authHeader = req.headers.authorization; // Get token from Authorization header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from the header

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key here
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = decoded; // Attach the decoded user info to the request object
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized", error });
    }
  },
};
