import { BannerEntity } from '../banner';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { FooterEntity } from '../footer';
import { HeaderEntity } from '../header';
import { LandingPageTypes } from '@domain/enum';
import { SocialEntity } from '../social';
import { UserEntity } from '../user';

@Entity({ name: 'landing_page' })
export class LandingPageEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 30, unique: true })
  public handle: string;

  @Column({ length: 30 })
  public title: string;

  @Column({ nullable: true })
  public logo?: string;

  @Column({ default: false, type: 'boolean' })
  public published: boolean;

  @Column({ nullable: true })
  public contractAddress?: string;

  @Column({ nullable: true })
  public buyTokenLink?: string;

  @Column({ type: 'json' })
  public appearance: object;

  @Column({ default: LandingPageTypes.PAGE, enum: LandingPageTypes, type: 'enum' })
  public type: LandingPageTypes;

  @ManyToOne(() => UserEntity, (user) => user.landingPage)
  public user: UserEntity;

  @OneToOne(() => HeaderEntity, (header) => header.landingPage, { cascade: true })
  @JoinColumn()
  public header: HeaderEntity;

  @OneToOne(() => FooterEntity, (footer) => footer.landingPage, { cascade: true })
  @JoinColumn()
  public footer: FooterEntity;

  @OneToOne(() => SocialEntity, (social) => social.landingPage, { cascade: true })
  @JoinColumn()
  public social: SocialEntity;

  @OneToMany(() => BannerEntity, (banner) => banner.landingPage, { cascade: true })
  public banners: BannerEntity[];

  @Column({ nullable: true, type: 'timestamp with time zone' })
  public finishedAt?: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  public constructor(
    id: string,
    handle: string,
    title: string,
    appearance: object,
    type: LandingPageTypes,
    user: UserEntity,
    header: HeaderEntity,
    published: boolean,
    footer: FooterEntity,
    social: SocialEntity,
    banners: BannerEntity[],
    logo?: string,
    contractAddress?: string,
    buyTokenLink?: string,
    finishedAt?: Date,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.handle = handle;
    this.title = title;
    this.appearance = appearance;
    this.published = published;
    this.type = type;
    this.user = user;
    this.header = header;
    this.footer = footer;
    this.social = social;
    this.banners = banners;
    this.logo = logo;
    this.contractAddress = contractAddress;
    this.buyTokenLink = buyTokenLink;
    this.finishedAt = finishedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
