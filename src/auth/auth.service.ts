import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In } from "typeorm";
import { User } from "./entities/auth.entity";
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  registerUser(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  } 
} 