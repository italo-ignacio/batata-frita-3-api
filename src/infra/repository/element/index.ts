import { DataSource } from '@infra/database';
import { ElementEntity } from '@domain/entity';

export const elementRepository = DataSource.getRepository(ElementEntity);
