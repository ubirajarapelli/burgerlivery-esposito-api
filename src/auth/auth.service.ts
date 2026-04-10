import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthLoginDto } from './dto/authLogin.dto';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { CreateBackofficeUserDto } from './dto/createBackofficeUser.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // LOGIN: email/senha
  // async validateUser(email: string, password: string): Promise<User> {
  //   const user = await this.userService.findByEmail(email);
  //   if (
  //     user &&
  //     user.password &&
  //     (bcrypt.compare(password, user.password) as any)
  //   ) {
  //     return user;
  //   }
  //   throw new UnauthorizedException('Invalid credentials');
  // }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user?.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(dto: AuthLoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    });
    return {
      accessToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        phone: user.phone,
      },
    };
  }

  // REGISTRO: cliente
  async register(dto: AuthRegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.userService.create({
      ...dto,
      password: hashedPassword,
      role: 'costumer',
    });
  }

  // REGISTRO: backoffice
  async createBackofficeUser(dto: CreateBackofficeUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.userService.create({
      ...dto,
      password: hashedPassword,
      role: 'admin',
    });
  }

  // GOOGLE
  async validateGoogleUser(profile: {
    email: string;
    sub: string;
  }): Promise<User> {
    const { email, sub: googleId } = profile;
    let user = await this.userService.findByGoogleId(googleId);
    if (!user) {
      user = await this.userService.create({
        email,
        googleId,
        role: 'client',
        password: '',
        name: '',
        cpf: '',
        address: undefined,
        phone: '',
      });
    }
    return user;
  }

  loginWithGoogle(user: User) {
    const token = this.jwtService.sign({ sub: user.id, role: user.role });
    return {
      accessToken: token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}
