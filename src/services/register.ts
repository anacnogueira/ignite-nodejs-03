import { usersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface registerServiceRequest {
  name: string;
  email: string;
  password: string;
}
export class RegisterService {
  constructor(private usersRepository: usersRepository) {}

  async execute({ name, email, password }: registerServiceRequest) {
    const password_hash = await hash(password, 6);

    const userWithSomeEmail = await this.usersRepository.findByEmail(email);

    if (userWithSomeEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
