import { DataSource } from '@infra/database';
import { HeaderEntity } from '@domain/entity';

export const headerRepository = DataSource.getRepository(HeaderEntity);
