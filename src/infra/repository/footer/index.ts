import { DataSource } from '@infra/database';
import { FooterEntity } from '@domain/entity';

export const footerRepository = DataSource.getRepository(FooterEntity);
