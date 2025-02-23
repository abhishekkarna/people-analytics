import bcrypt from "bcryptjs";
import crypto from "crypto";

export function isAuthorized(
  accessRequired: string[],
  currentPermissions: string[]
) {
  if (!currentPermissions) return false;
  const isAuthorized = accessRequired.every((access) =>
    currentPermissions.includes(access)
  );
  return isAuthorized;
}

export function hashPassword(password: string, len = 10) {
  return bcrypt.hash(password, len);
}

export function generateRandomPassword(length: number = 12) {
  const plain_password = crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, length);
  return hashPassword(plain_password);
}
