import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto): Promise<void> {
    
	  const {username, email, password} = createUserDto;
    await this.validateUser(username, email)

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      email,
      password: hashPassword,
      isActive: true
    })

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar usuário.');
    }
  }

  async validateUser(username: string, email: string): Promise<void>  {
    const existingUserByUsername = await this.findOne(username);
    if (existingUserByUsername) {
      throw new ConflictException('Username já está em uso.');
    }

    const existingUserByEmail = await this.findOne(email);
    if (existingUserByEmail) {
      throw new ConflictException('Email já está em uso.');
    }
  }

  async findOne(usernameOrEmail: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: [
        { username: usernameOrEmail },
        { email: usernameOrEmail },
      ],
      select: {
        id: true,
        username: true,
        email: true,
        password: true
      }
    });
  }
}
