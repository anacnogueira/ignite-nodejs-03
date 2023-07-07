import { expect, describe, it } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoiryUseraREpository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Service", () => {
  it("should should be able to register", async () => {
    const usersRepository = new InMemoiryUseraREpository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoiryUseraREpository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to regisster with same email twice", async () => {
    const usersRepository = new InMemoiryUseraREpository();
    const registerService = new RegisterService(usersRepository);

    const email = "johndoe@example.com";

    await registerService.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerService.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
