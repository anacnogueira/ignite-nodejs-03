import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface registerServiceRequest {
  name: string;
  email: string;
  password: string;
}
export class RegisterService {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: registerServiceRequest) {
    const password_hash = await hash(password, 6);

    const userWithSomeEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

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
