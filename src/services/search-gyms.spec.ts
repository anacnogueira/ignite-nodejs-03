import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsService } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe("Search Gym Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Academia da Ana",
      description: null,
      phone: null,
      latitude: -23.2925701,
      longitude: -45.94315,
    });

    await gymsRepository.create({
      title: "Academia do Doni",
      description: null,
      phone: null,
      latitude: -23.2925701,
      longitude: -45.94315,
    });

    const { gyms } = await sut.execute({
      query: "Ana",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Academia da Ana" }),
    ]);
  });

  it("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia do Ana ${i}`,
        description: null,
        phone: null,
        latitude: -23.2925701,
        longitude: -45.94315,
      });
    }

    const { gyms } = await sut.execute({
      query: "Ana",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Academia do Ana 21" }),
      expect.objectContaining({ title: "Academia do Ana 22" }),
    ]);
  });
});
