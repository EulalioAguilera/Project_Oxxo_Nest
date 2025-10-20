import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

 @Post('upload')
  async uploadPhoto(@Body() body: any) {
    const file = body.file;

    // Check if the file exists
    if (!file) {
      throw new Error('No file provided');
    }

    // Move the file to the desired location
    const destination = './uploads/' + file.name;
    const writeStream = fs.createWriteStream(destination);
    writeStream.write(file.data);
    writeStream.end();

    return "OK";
  }


  @Get('/:id')
  findOne(
    @Param('id', new ParseUUIDPipe({version : '4'}))
    id : string
  )
  {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version : '4'})) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version : '4'})) id: string) {
    return this.employeesService.remove(id);
  }
}