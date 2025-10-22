import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Registrar usuario
  async registerUser(createUserDto: CreateUserDto) {
    // Hashear la contraseña antes de guardar
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Login usuario
  async loginUser(loginUserDto: LoginUserDto) {
    // Buscar usuario por email
    const user = await this.userRepository.findOne({
      where: { userEmail: loginUserDto.userEmail },
    });

    // Si no existe, lanzar error
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Comparar contraseña
    const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword);
    if (!match) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Payload del token (no incluir contraseña)
    const payload = {
      userId: user.userId,
      userEmail: user.userEmail,
      userRoles: user.userRoles,
    };

    // Firmar JWT
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
