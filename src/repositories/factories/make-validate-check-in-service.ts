import { ValidateCheckInService } from "@/services/validate-check-in";
import { PrismaCheckInsRepository } from "../prisma/prisma-check-ins.repository";

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new ValidateCheckInService(checkInsRepository);

  return service;
}
