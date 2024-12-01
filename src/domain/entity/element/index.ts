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
import { TypeEntity } from '../type';

@Entity({ name: 'element' })
export class ElementEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'float' })
  public points: number;

  @Column({ type: 'json' })
  public data: object;

  @Column({ type: 'json' })
  public style: object;

  @OneToOne(() => TypeEntity, (type) => type.element, { cascade: true })
  @JoinColumn()
  public type: TypeEntity;

  @ManyToOne(() => BannerEntity, (banner) => banner.elements)
  public banner: BannerEntity;

  @OneToMany(() => ElementEntity, (element) => element.parent)
  public children?: ElementEntity[];

  @ManyToOne(() => ElementEntity, (element) => element.children, { nullable: true })
  public parent?: ElementEntity;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  public finishedAt?: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  public constructor(
    id: string,
    points: number,
    data: object,
    style: object,
    type: TypeEntity,
    banner: BannerEntity,
    parent?: ElementEntity,
    children?: ElementEntity[],
    finishedAt?: Date,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.points = points;
    this.data = data;
    this.style = style;
    this.type = type;
    this.banner = banner;
    this.parent = parent;
    this.children = children;
    this.finishedAt = finishedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
