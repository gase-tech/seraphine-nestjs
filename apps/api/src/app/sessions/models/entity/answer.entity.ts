import { AutoMap } from "@automapper/classes";
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../../user/models/user.entity";

@Entity()
export class Answer {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @CreateDateColumn()
  createDate: Date;

  @AutoMap()
  @UpdateDateColumn()
  updateDate: Date;

  createdBy: User;
}
