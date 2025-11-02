import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Employee {
  @ApiProperty({ example: 'UUID' })
  @PrimaryGeneratedColumn('uuid')
  employeeId: string;

  @ApiProperty({ example: 'Karlo' })
  @Column({ length: 30 })
  employeeName: string;

  @ApiProperty({ example: 'Paz' })
  @Column({ length: 70 })
  employeeLastName: string;

  @ApiProperty({ example: '4421388410' })
  @Column({ length: 10 })
  employeePhoneNumber: string;

  @ApiProperty({ example: 'karlo@email.com' })
  @Column({ unique: true })
  employeeEmail: string;

  @ApiPropertyOptional({ type: () => Location })
  @ManyToOne(() => Location, (location) => location.employees, { nullable: true })
  @JoinColumn({ name: 'locationId' })
  location?: Location;
}
