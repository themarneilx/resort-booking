import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-jwt-secret-replace-in-prod");
const REFRESH_SECRET = new TextEncoder().encode(process.env.REFRESH_SECRET || "default-refresh-secret-replace-in-prod");

export interface TokenPayload {
  userId: string;
  role: string;
  [key: string]: unknown;
}

export const signAccessToken = async (payload: TokenPayload): Promise<string> => {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m") // Short-lived
    .sign(JWT_SECRET);
};

export const signRefreshToken = async (payload: TokenPayload): Promise<string> => {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Long-lived
    .sign(REFRESH_SECRET);
};

export const verifyAccessToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET);
    return payload as TokenPayload;
  } catch (error) {
    return null;
  }
};
