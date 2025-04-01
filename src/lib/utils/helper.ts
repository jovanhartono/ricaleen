import bcrypt from "bcryptjs";

export const hashPasswordWithSalt = (password: string) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};
