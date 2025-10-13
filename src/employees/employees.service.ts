import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(createEmployeeDto);
    await this.employeeRepository.save(employee);
    return employee;
  }

  async findAll() {
    return await this.employeeRepository.find({
    });
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOne({
      where: { employeeId: id },
    });
    if (!employee) throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    return employee;
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    await this.employeeRepository.delete({ employeeId: id });
    return {
      message: `Empleado con id ${id} eliminado correctamente`,
    };
  }
}
