import { AuthenticateService } from "@/services/authenticate";
import { PrismaUsersRepository } from "../prisma/prisma-users-repository";

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);

  return authenticateService;
}
