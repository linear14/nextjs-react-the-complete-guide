import { hash, compare } from "bcrypt";

export const hashPassword = async (password) => {
  return await hash(password, 12);
};

export const isSamePassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword)
}