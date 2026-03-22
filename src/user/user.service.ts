import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly i18n: I18nService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  findByGoogleId(googleId: string): Promise<User | null> {
    return this.userRepository.findOneBy({ googleId });
  }

  async create(user: CreateUserDto): Promise<User> {
    const hasUser = await this.userRepository.findOne({
      where: [{ email: user.email }, { cpf: user.cpf }],
    });

    if (hasUser) {
      throw new BadRequestException(
        this.i18n.t('usuarios.errors.existingUser'),
      );
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async updateAddress(id: string, user: Partial<User>): Promise<User | null> {
    const data = await this.userRepository.findOne({
      where: { id },
    });

    if (!data) return null;

    if (user.address) {
      data.address = {
        ...data.address,
        ...user.address,
      };
    }
    await this.userRepository.save(data);
    return this.userRepository.findOneBy({ id });
  }

  async updatePassword(id: string, newPassword: string): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(id, { password: hashedPassword });
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
