import { Gym, Prisma } from "@prisma/client";

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  create(date: Prisma.GymCreateInput): Promise<Gym>;
}
