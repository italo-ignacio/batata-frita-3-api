import { DataSource } from '@infra/database';
import { LinkEntity } from '@domain/entity';

export const linkRepository = DataSource.getRepository(LinkEntity);
