import { PrismaGymsRepository } from "../prisma/prima-gyms-repository";
import { CreateGymService } from "@/services/create-gym";

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository();
  const service = new CreateGymService(gymsRepository);

  return service;
}
