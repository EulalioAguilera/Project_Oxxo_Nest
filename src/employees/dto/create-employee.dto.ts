import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiExtraModels, ApiProperty, ApiPropertyOptional, ApiTags } from "@nestjs/swagger";
import { CreateLocationDto } from "src/locations/dto/create-location.dto";


class LocationForEmployeeDto extends Location {
  @ApiProperty()
  locationId: number = 0;
  @ApiPropertyOptional()
  locationName: string = new CreateLocationDto().locationName;
  @ApiPropertyOptional()
  locationLatLng: number[] = [];
  @ApiPropertyOptional()
  locationAddress: string = '';
}

@ApiTags('Employee')
export class CreateEmployeeDto extends Employee {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  employeeName: string = '';
  @ApiProperty()
  @IsString()
  @MaxLength(70)
  employeeLastName: string = '';

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  employeePhoneNumber: string = '';

  @ApiProperty()
  @IsString()
  @IsEmail()
  employeeEmail: string = '';

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  location: LocationForEmployeeDto = new LocationForEmployeeDto();
}