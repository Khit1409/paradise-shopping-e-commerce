import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("Users")
@Unique(["emailAddress"])
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  userId: string;
  @Column({ type: "nvarchar", length: 200 })
  firtName: string;
  @Column({ type: "nvarchar", length: 200 })
  lastName: string;
  @Column({ type: "nvarchar", length: 200 })
  fullName: string;
  @Column({ type: "nvarchar", length: 10 })
  phoneNumber: string;
  @Column({ type: "nvarchar" })
  emailAddress: string;
  @Column({})
  userRole: "user" | "seller";
  @Column({ type: "uuid", nullable: true })
  userStore: string;
  @Column({ type: "text" })
  passwordHashed: string;
  @Column({ type: "text" })
  avatarUrl: string;
  @Column({ type: "datetime2", default: new Date() })
  createdAt: Date;
  @Column({ type: "datetime2", default: new Date() })
  updatedAt: Date;
}
