import { usersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

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
      throw new Error("E-mail already exists.");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
