import { expect, describe, it } from "vitest";
import { hash } from "bcryptjs";
import { InMemoiryUseraRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateService } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Service", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoiryUseraRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await authenticateService.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong e-mail", async () => {
    const usersRepository = new InMemoiryUseraRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    await expect(() => {
      authenticateService
        .execute({
          email: "johndoe@example.com",
          password: "123456",
        })
        .rejects.toBeInstanceOf(InvalidCredentialsError);
    });
  });

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoiryUseraRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() => {
      authenticateService
        .execute({
          email: "johndoe@example.com",
          password: "654321",
        })
        .rejects.toBeInstanceOf(InvalidCredentialsError);
    });
  });
});
