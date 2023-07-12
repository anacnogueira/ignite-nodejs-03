import { Gym, Prisma } from "@prisma/client";

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(date: Prisma.GymCreateInput): Promisse<Gym>;
}
