import { PrismaGymsRepository } from "../prisma/prima-gyms-repository";
import { SearchGymsService } from "@/services/search-gyms";

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const service = new SearchGymsService(gymsRepository);

  return service;
}
