import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ElementEntity } from '../element';

@Entity('type')
export class TypeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 50, type: 'varchar', unique: true })
  public name: string;

  @Column({ length: 255, type: 'varchar' })
  public description: string;

  @OneToOne(() => ElementEntity, (element) => element.type)
  public element: ElementEntity;

  @Column({ default: false, type: 'boolean' })
  public allowedChildren: boolean;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  public finishedAt: Date | null;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  public constructor(
    id: string,
    name: string,
    element: ElementEntity,
    description: string,
    allowedChildren = false,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    finishedAt: Date | null = null
  ) {
    this.id = id;
    this.name = name;
    this.element = element;
    this.description = description;
    this.allowedChildren = allowedChildren;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.finishedAt = finishedAt;
  }
}
