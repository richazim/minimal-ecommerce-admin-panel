import { hashPassword } from "./hashPassword";

export async function isValidPassword(
    password: string,
    hashedPassword: string
  ) {
    return (await hashPassword(password)) === hashedPassword
  }