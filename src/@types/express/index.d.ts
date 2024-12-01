import type { Plans, UserStatus } from '@domain/enum';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        googleId: string;
        email: string;
        name: string;
        plan: Plans;
        status: UserStatus;
        maxLandingPage: number;
        maxSocialLink: number;
        maxBanner: number;
        maxPointsByBanner: number;
        finishedAt?: Date;
        planExpireAt: Date;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}
