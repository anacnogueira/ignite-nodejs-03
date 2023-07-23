import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsHistoryService } from "@/repositories/factories/make-fetch-user-check-ins-history-service";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistorySchema.parse(request.query);

  const fetchUserCheckInHistoryService = makeFetchUserCheckInsHistoryService();

  const { checkIns } = await fetchUserCheckInHistoryService.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
