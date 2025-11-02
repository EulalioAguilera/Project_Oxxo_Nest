import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiResponse, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { AuthApi } from 'src/auth/decorators/api.decorator';
import { File } from 'multer';

@AuthApi()
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // Crear empleado
  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    description: 'Empleado creado correctamente',
    type: Employee,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  // Subir foto
  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo de foto del empleado',
    type: 'multipart/form-data',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Foto subida correctamente' })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadPhoto(@UploadedFile() file: File) {
    return 'OK';
  }

  // Listar todos los empleados
  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 200,
    description: 'Lista de empleados',
    type: [Employee],
  })
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  // Obtener un empleado por ID
  @Auth(ROLES.MANAGER)
  @ApiResponse({ status: 200, description: 'Empleado encontrado', type: Employee })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  @Get('/:id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.findOne(id);
  }

  // Obtener empleados por ubicación
  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 200,
    description: 'Lista de empleados por ubicación',
    type: [Employee],
  })
  @Get('/location/:id')
  findAllLocation(@Param('id') id: string) {
    return this.employeesService.findByLocation(+id);
  }

  // Actualizar empleado
  @Auth(ROLES.EMPLOYEE)
  @ApiResponse({ status: 200, description: 'Empleado actualizado correctamente', type: Employee })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  @Patch('/:id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  // Eliminar empleado
  @Auth(ROLES.MANAGER)
  @ApiResponse({ status: 200, description: 'Empleado eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  @Delete('/:id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.remove(id);
  }
}
