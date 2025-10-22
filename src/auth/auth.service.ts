import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Registro de usuario
  async registerUser(createUserDto: CreateUserDto) {
    // Hashear contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(createUserDto.userPassword, 5);
    createUserDto.userPassword = hashedPassword;

    return this.userRepository.save(createUserDto);
  }

  // Login de usuario
  async loginUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { userEmail: createUserDto.userEmail },
    });

    // Verificar si el usuario existe
    if (!user) {
      throw new UnauthorizedException('No estás autorizado');
    }

    // Comparar la contraseña
    const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword);
    if (!match) {
      throw new UnauthorizedException('No estás autorizado');
    }

    // Crear JWT seguro
    const payload = { userId: user.userId, email: user.userEmail }; // payload mínimo
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'SECRET_KEY', {
      expiresIn: '1h',
    });

    return { access_token: token };
  }
}
