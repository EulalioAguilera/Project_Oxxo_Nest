import { Entity,PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("text")
  locationName: string;

  @Column()
  locationId: string;

  @Column()
  locationAddress: string;

  @Column()
  locationLatLng: number[];
}
