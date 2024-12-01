import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { LandingPageEntity } from '../landing-page';
import { LinkEntity } from '../link';

@Entity('social')
export class SocialEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ default: 1, type: 'int' })
  public type: number;

  @Column({ default: 1, type: 'int' })
  public mobileType: number;

  @Column({ type: 'json' })
  public style: object;

  @Column({ default: true, type: 'boolean' })
  public show: boolean;

  @OneToMany(() => LinkEntity, (link) => link.social)
  public links: LinkEntity[];

  @OneToOne(() => LandingPageEntity, (landingPage) => landingPage.header)
  public landingPage: LandingPageEntity;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  public finishedAt: Date | null;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  public constructor(
    id: string,
    landingPage: LandingPageEntity,
    links: LinkEntity[],
    type = 1,
    mobileType = 1,
    style: object = {},
    show = true,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    finishedAt: Date | null = null
  ) {
    this.id = id;
    this.landingPage = landingPage;
    this.type = type;
    this.mobileType = mobileType;
    this.style = style;
    this.show = show;
    this.links = links;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.finishedAt = finishedAt;
  }
}
