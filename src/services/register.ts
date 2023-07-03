import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface registerServiceRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerService({
  name,
  email,
  password,
}: registerServiceRequest) {
  const password_hash = await hash(password, 6);

  const userWithSomeEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSomeEmail) {
    throw new Error("E-mail already exists.");
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });
}
