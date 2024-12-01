import { BannerEntity } from '@domain/entity';
import { DataSource } from '@infra/database';

export const bannerRepository = DataSource.getRepository(BannerEntity);
