import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateEmployeeDto  {
  @IsString()
  @MaxLength(30)


  @IsString()
  @MaxLength(70)


  @IsString()
  @MaxLength(10)

  @IsString()
  @IsEmail()
  employeeEmail: string;

  @IsOptional()
  @IsString()
  location: Location | string;

  @IsOptional()
  emplyeePhoto: string;
}