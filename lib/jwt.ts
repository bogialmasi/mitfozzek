import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load the environment variables from .env.local

const JWT_SECRET = process.env.JWT_SECRET!;  // The secret key for JWT signing, The '!' ensures it won't be undefined
const EXPIRES = '1m';
console.log("My secret key: " + JWT_SECRET)
// Check if the JWT_SECRET is defined
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET nincs a lokális változók között");
}

// Generate a JWT
export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES });
}

// Verify a JWT
export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded JWT Payload:", decoded);
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error("JWT token has expired");
    } else if (error instanceof Error) {
      console.error("JWT verification failed:", error.message);
    } else {
      console.error("Unknown error during JWT verification.");
    }
  }
}
