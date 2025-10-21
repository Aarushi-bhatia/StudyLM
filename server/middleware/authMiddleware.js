import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  }  catch (err) {
  // Log the specific error to your server console
  console.error("JWT Verification Error:", err.message);

  // Send a more specific error back
  return res.status(401).json({ error: `Invalid token: ${err.message}` });
}
}