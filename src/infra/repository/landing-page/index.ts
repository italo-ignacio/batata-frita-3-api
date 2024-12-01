import { DataSource } from '@infra/database';
import { LandingPageEntity } from '@domain/entity';

export const landingPageRepository = DataSource.getRepository(LandingPageEntity);
