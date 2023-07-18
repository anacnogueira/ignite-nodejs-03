import { RegisterService } from "@/services/register";
import { PrismaUsersRepository } from "../prisma/prisma-users-repository";

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository();
  const service = new RegisterService(usersRepository);

  return service;
}
