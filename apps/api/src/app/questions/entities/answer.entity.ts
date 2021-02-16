import { AutoMap } from "@automapper/classes";
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/models/user.entity";

@Entity()
export class Answer {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @AutoMap()
  @CreateDateColumn()
  createdDate: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedDate: Date;

  createdBy: User;
}
