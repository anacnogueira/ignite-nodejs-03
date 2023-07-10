import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoiryUseraRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileService } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoiryUseraRepository;
let sut: GetUserProfileService;

describe("Get User Profile Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoiryUseraRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it("should be able to get profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("John Doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() => {
      sut
        .execute({
          userId: "non-existing-id",
        })
        .rejects.toBeInstanceOf(ResourceNotFoundError);
    });
  });
});
