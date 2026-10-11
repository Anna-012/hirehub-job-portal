import crypto from "crypto";

export const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  return resetToken;
};
