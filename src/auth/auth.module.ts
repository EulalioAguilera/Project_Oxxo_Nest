import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/auth.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Employee, Manager]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Add this line if you want to export AuthService
})
export class AuthModule {}