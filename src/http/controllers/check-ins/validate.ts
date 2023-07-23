import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCheckInService } from "@/repositories/factories/make-check-in-service";
import { makeValidateCheckInService } from "@/repositories/factories/make-validate-check-in-service";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validatecheckInService = makeValidateCheckInService();

  await validatecheckInService.execute({
    checkInId,
  });

  return reply.status(204).send();
}
