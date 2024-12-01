import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { HeaderEntity } from '../header';
import { LinkType } from '@domain/enum';
import { SocialEntity } from '../social';

@Entity('link')
export class LinkEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ enum: LinkType, type: 'enum' })
  public type: LinkType;

  @Column({ type: 'json' })
  public data: object;

  @Column({ type: 'json' })
  public style: object;

  @ManyToOne(() => HeaderEntity, (header) => header.links, { nullable: true })
  public header: HeaderEntity | null;

  @ManyToOne(() => SocialEntity, (social) => social.links, { nullable: true })
  public social: SocialEntity | null;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  public finishedAt: Date | null;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  public constructor(
    id: string,
    type: LinkType,
    data: object,
    social: SocialEntity | null,
    header: HeaderEntity | null,
    style: object,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    finishedAt: Date | null = null
  ) {
    this.id = id;
    this.type = type;
    this.data = data;
    this.style = style;
    this.social = social;
    this.header = header;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.finishedAt = finishedAt;
  }
}
