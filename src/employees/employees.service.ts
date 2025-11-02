import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  // Crear empleado
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  // Listar todos los empleados
  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['location'] });
  }

  // Obtener empleados por ubicación
  async findByLocation(locationId: number): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: { location: { locationId } },
      relations: ['location'],
    });
  }

  // Obtener un empleado por ID
  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { employeeId: id },
      relations: ['location'],
    });
    if (!employee) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return employee;
  }

  // Actualizar empleado
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto,
    });

    if (!employee) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }

    return this.employeeRepository.save(employee);
  }

  // Eliminar empleado
  async remove(id: string): Promise<{ message: string }> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
    return { message: 'Empleado eliminado correctamente' };
  }
}
