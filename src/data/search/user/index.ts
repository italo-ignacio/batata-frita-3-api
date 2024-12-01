import type { FindOptionsSelect } from 'typeorm';
import type { UserEntity } from '@domain/entity';

export const userFindParams = (
  values?: FindOptionsSelect<UserEntity>
): FindOptionsSelect<UserEntity> => ({
  createdAt: true,
  email: true,
  finishedAt: true,
  googleId: true,
  id: true,
  landingPage: {
    handle: true,
    id: true,
    title: true
  },
  maxBanner: true,
  maxLandingPage: true,
  maxPointsByBanner: true,
  maxSocialLink: true,
  name: true,
  plan: true,
  planExpireAt: true,
  status: true,
  updatedAt: true,
  ...values
});
