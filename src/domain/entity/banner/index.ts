import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ElementEntity } from '../element';
import { LandingPageEntity } from '../landing-page';

@Entity({ name: 'banner' })
export class BannerEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToMany(() => ElementEntity, (element) => element.banner, { cascade: true })
  public elements: ElementEntity[];

  @Column({ type: 'json' })
  public style: object;

  @ManyToOne(() => LandingPageEntity, (landingPage) => landingPage.banners)
  public landingPage: LandingPageEntity;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  public finishedAt?: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  public constructor(
    id: string,
    style: object,
    landingPage: LandingPageEntity,
    elements: ElementEntity[],
    finishedAt?: Date,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.style = style;
    this.landingPage = landingPage;
    this.elements = elements;
    this.finishedAt = finishedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
