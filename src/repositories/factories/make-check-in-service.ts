import { PrismaCheckInsRepository } from "../prisma/prisma-check-ins.repository";
import { PrismaGymsRepository } from "../prisma/prima-gyms-repository";
import { CheckInService } from "@/services/check-in";

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const service = new CheckInService(checkInsRepository, gymsRepository);

  return service;
}
