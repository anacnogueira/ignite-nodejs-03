import { usersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AutheticateServiceRequest {
  email: string;
  password: string;
}

interface AutheticateServiceResponse {
  user: User;
}

export class AutheticateService {
  constructor(private UsersRepository: usersRepository) {}

  async execute({
    email,
    password,
  }: AutheticateServiceRequest): Promise<AutheticateServiceResponse> {
    const user = await this.UsersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.passaword_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
