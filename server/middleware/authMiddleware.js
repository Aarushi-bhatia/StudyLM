import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {

  console.log("Current Secret:", process.env.JWT_SECRET);

  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    console.error("CRITICAL: JWT_SECRET is not defined in environment variables!");
    return res.status(500).json({ error: "Internal server configuration error" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // --- ADD THIS LINE ---
    console.log("DECODED TOKEN PAYLOAD:", decoded); 
    // ---
    
    req.user = { id: decoded.id }; 
    next();
  }  catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ error: `Invalid token: ${err.message}` });
  }
}