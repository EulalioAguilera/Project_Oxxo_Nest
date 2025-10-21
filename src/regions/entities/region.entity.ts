import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: number = 0;
    @Column({
        type: 'text',
        unique: true,
    })
    regionName: string = '';
    @Column("array")
    regionStates: string[] = [];

  @OneToMany(() => Location, (location) => location.region)
  locations: Location[];
}
