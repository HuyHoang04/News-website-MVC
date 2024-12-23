import jwt from "jsonwebtoken";
export const middleware = {
  verifyRole: (roles) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized", error });
    }
  },
};
