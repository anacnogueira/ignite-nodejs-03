import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface getUserMetricsServiceRequest {
  userId: string;
}

interface getUserMetricsServiceResponse {
  checkInsCount: number;
}

export class getUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: getUserMetricsServiceRequest): Promise<getUserMetricsServiceResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
