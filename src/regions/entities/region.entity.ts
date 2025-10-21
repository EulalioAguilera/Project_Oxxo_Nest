import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}   
