import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { v4 as uuid } from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee;
  }

  findAll() {
    return this.employeeRepository.find({
    });
  }

  findByLocation(id: number) {
    return this.employeeRepository.findBy({
    })
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOne({
      where : {
        employeeId: id
      },
    })
    return employee;
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    })
    return {
      message: "Employee deleted"
    }
  }

  update(id: string, updateEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.save({
      employeeId: id,
      ...updateEmployeeDto
    })
  } 
}