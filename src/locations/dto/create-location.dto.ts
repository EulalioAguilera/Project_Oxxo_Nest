import { arrayNotEmpty, IsArray, isArray, IsString, max } from "class-validator";
import { Location } from "../entities/location.entity";
import { ArrayMaxSize, ArrayNotEmpty, MaxLength } from "class-validator";

export class CreateLocationDto extends Location{
    @IsString()
    @MaxLength(35)
    locationName: string = "";
    @IsString()
    @MaxLength(160)
    locationAddress: string = "";
    @IsArray()
    @ArrayMaxSize(12)
    @ArrayNotEmpty()
    declare locationLatLng: number[];
}
