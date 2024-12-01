import { DataSource } from '@infra/database';
import { SocialEntity } from '@domain/entity';

export const socialRepository = DataSource.getRepository(SocialEntity);
