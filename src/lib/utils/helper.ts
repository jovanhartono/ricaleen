import bcrypt from "bcryptjs";

export const hashPasswordWithSalt = (password: string) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

export const toSlug = (title: string): string => {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars (except hyphens)
    .replace(/\-\-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+/, "") // Trim hyphens from start
    .replace(/-+$/, ""); // Trim hyphens from end
};
