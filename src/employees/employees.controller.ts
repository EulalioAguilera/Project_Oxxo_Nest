import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { Multer, MulterFile } from 'multer';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth(ROLES.MANAGER)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@UploadedFile() file: MulterFile) {
    return "OK";
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({version: '4'}))
    id: string
  ) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.EMPLOYEE)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({version: '4'}))
    id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({version: '4'}))
    id: string
  ) {
    return this.employeesService.remove(id);
  }
}