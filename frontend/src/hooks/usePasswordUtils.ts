import bcrypt from "bcrypt";

export function usePasswordUtils() {
  async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async function validateHashedPassword(
    password: string,
    hashedPassword: string
  ) {
    return bcrypt.compare(password, hashedPassword);
  }

  function generateRandomPassword(length = 8) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  return {
    hashPassword,
    validateHashedPassword,
    generateRandomPassword,
  };
}
