import { DataSource } from '@infra/database';
import { TypeEntity } from '@domain/entity';

export const typeRepository = DataSource.getRepository(TypeEntity);
