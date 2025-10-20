import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  employeeId: string;
  @Column('text')
  employeeName: string;
  @Column('text')
  employeeLastName: string;
  @Column('text')
  employeePhoneNumber: string;
  @Column('text', {
    unique: true
  })
  employeeEmail: string;
  @Column({
    type: 'text',
    nullable: true
  })
  employeePhoto: string;
}