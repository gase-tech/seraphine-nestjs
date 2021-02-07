import { AutoMap } from '@automapper/classes';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ unique: true })
  username: string;

  @AutoMap()
  email: string;

  @AutoMap()
  @Column()
  firstName: string;

  @AutoMap()
  @Column()
  lastName: string;

  @Column()
  @AutoMap()
  password: string;

  @AutoMap()
  @Column()
  role: string;

  @AutoMap()
  @Column({ default: true })
  isActive: boolean;

  @BeforeInsert()
  emailToLowerCase() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }
}
