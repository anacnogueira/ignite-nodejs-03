import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymServiceService;

describe("Create Gym Service", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository);
  });

  it("should should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Academia da Ana",
      description: null,
      phone: null,
      latitude: -23.2925701,
      longitude: -45.94315,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
