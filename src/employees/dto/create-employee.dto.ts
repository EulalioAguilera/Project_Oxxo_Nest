import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEmployeeDto {
  @ApiProperty({
    example: "Karlo",
    description: "Nombre del empleado",
    maxLength: 30,
  })
  @IsString()
  @MaxLength(30)
  employeeName: string;

  @ApiProperty({
    example: "Paz",
    description: "Apellido del empleado",
    maxLength: 70,
  })
  @IsString()
  @MaxLength(70)
  employeeLastName: string;

  @ApiProperty({
    example: "442138841",
    description: "Número de teléfono del empleado",
    maxLength: 10,
  })
  @IsString()
  @MaxLength(10)
  employeePhoneNumber: string;

  @ApiProperty({
    example: "karlo@gmail.com",
    description: "Correo electrónico del empleado",
  })
  @IsString()
  @IsEmail()
  employeeEmail: string;

  @ApiPropertyOptional({
    example: {
      locationId: 13,
      locationName: "OCSO Entrada",
      locationLatLng: [12, -140],
      locationAddress: "Entrada Av. 5, Querétaro, México",
    },
    description: "Ubicación asignada al empleado",
  })
  @IsOptional()
  @IsObject()
  location?: Location;
}
