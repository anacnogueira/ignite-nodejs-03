import { FetchNearbyGymsService } from "@/services/fetch-nearby-gyms";
import { PrismaGymsRepository } from "../prisma/prima-gyms-repository";

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const service = new FetchNearbyGymsService(gymsRepository);

  return service;
}
