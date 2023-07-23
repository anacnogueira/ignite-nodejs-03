import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsService } from "@/repositories/factories/make-search-gyms-service";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQueryParams = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymQueryParams.parse(request.body);

  const searchGymService = makeSearchGymsService();

  const { gyms } = await searchGymService.execute({
    query,
    page,
  });

  return reply.status(200).send({
    gyms,
  });
}
