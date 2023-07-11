import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe("Check-in Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);
    vi.useFakeTimers();

    gymsRepository.items.push({
      id: "gym-01",
      title: "Academia da Ana",
      description: "",
      phone: "",
      latitude: new Decimal(-23.2925701),
      longitude: new Decimal(-45.9431597),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -23.2925701,
      userLongitude: -45.94315,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 6, 11, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -23.2925701,
      userLongitude: -45.94315,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -23.2925701,
        userLongitude: -45.94315,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in diferent days", async () => {
    vi.setSystemTime(new Date(2023, 6, 11, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -23.2925701,
      userLongitude: -45.94315,
    });

    vi.setSystemTime(new Date(2023, 6, 12, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.2925701,
      userLongitude: -45.94315,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Academia da Thalia",
      description: "",
      phone: "",
      latitude: new Decimal(-23.2925701),
      longitude: new Decimal(-45.9431597),
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: -23.3005716,
        userLongitude: -45.9515282,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
