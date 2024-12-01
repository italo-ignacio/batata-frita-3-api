import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { LandingPageEntity } from '../landing-page';
import { Plans, UserStatus } from '@domain/enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 150, unique: true })
  public googleId: string;

  @Column({ length: 150 })
  public email: string;

  @Column({ length: 255 })
  public name: string;

  @Column({ default: Plans.FREE, enum: Plans, type: 'enum' })
  public plan: Plans;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp with time zone' })
  public planExpireAt: Date;

  @Column({ default: UserStatus.ACTIVE, enum: UserStatus, type: 'enum' })
  public status: UserStatus;

  @Column({ default: 1 })
  public maxLandingPage: number;

  @Column({ default: 3 })
  public maxSocialLink: number;

  @Column({ default: 2 })
  public maxBanner: number;

  @Column({ default: 4 })
  public maxPointsByBanner: number;

  @OneToMany(() => LandingPageEntity, (landingPage) => landingPage.user)
  public landingPage: LandingPageEntity[];

  @Column({ nullable: true, type: 'timestamp with time zone' })
  public finishedAt?: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  public constructor(
    id: string,
    googleId: string,
    email: string,
    name: string,
    plan: Plans,
    status: UserStatus,
    maxLandingPage: number,
    maxSocialLink: number,
    maxBanner: number,
    maxPointsByBanner: number,
    landingPage: LandingPageEntity[],
    finishedAt?: Date,
    planExpireAt: Date = new Date(),
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.googleId = googleId;
    this.email = email;
    this.name = name;
    this.plan = plan;
    this.planExpireAt = planExpireAt;
    this.status = status;
    this.maxLandingPage = maxLandingPage;
    this.maxSocialLink = maxSocialLink;
    this.maxBanner = maxBanner;
    this.maxPointsByBanner = maxPointsByBanner;
    this.landingPage = landingPage;
    this.finishedAt = finishedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
