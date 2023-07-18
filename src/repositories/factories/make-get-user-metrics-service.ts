import { getUserMetricsService } from "@/services/get-user-metrics";
import { PrismaCheckInsRepository } from "../prisma/prisma-check-ins.repository";

export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new getUserMetricsService(checkInsRepository);

  return service;
}
