import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	){}

	async createHashPassword(password: string): Promise<string> {
    	const salt = await bcrypt.genSalt();
    	const hashPassword = await bcrypt.hash(password, salt);

		return hashPassword;
	}

  	async create(createUserDto: CreateUserDto): Promise<void> {
    
	  	const {username, email, password, role} = createUserDto;
    	await this.validateUser(username, email)

    	const hashPassword = await this.createHashPassword(password);

		const user = this.usersRepository.create({
			username,
			email,
			password: hashPassword,
			role,
			isActive: true
		})

		try {
			await this.usersRepository.save(user);
		} catch (error) {
			throw new InternalServerErrorException('Erro ao criar usuário.');
		}
  	}

  	async validateUser(username: string, email: string): Promise<void>  {
		const existingUserByUsername = await this.findOneByUsernameOrEmail(username);
		if (existingUserByUsername) {
			throw new ConflictException('Username já está em uso.');
		}

		const existingUserByEmail = await this.findOneByUsernameOrEmail(email);
		if (existingUserByEmail) {
			throw new ConflictException('Email já está em uso.');
		}
	}

	async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined> {
		return this.usersRepository.findOne({
			where: [
				{ username: usernameOrEmail },
				{ email: usernameOrEmail },
			],
			select: {
				id: true,
				username: true,
				email: true,
				password: true,
				role: true
			}
		});
	}

	async updatePassword(id: string, password: string): Promise<User | undefined> { 
		const user = await this.usersRepository.findOne({
			where: { id }
		});
		const hashPassword = await this.createHashPassword(password);
		user.password = hashPassword;
		try {
			return await this.usersRepository.save(user);
		} catch (error) {
			throw new InternalServerErrorException('Erro ao criar usuário.');
		}
	}

	async update(newUser: UpdateUserDto): Promise<void> {
		const checkExistUser = await this.findOne(newUser.email);
	
		if (!checkExistUser) {
		  	throw new ConflictException('Usuário não encontrado.');
		}

		try {
			await this.usersRepository.update(checkExistUser.id, {
				username: newUser.username,
				email: newUser.email,
				role: newUser.role
			});
		} catch (error) {
		  	throw new InternalServerErrorException('Erro ao atualizar o usuário.');
		}
	}
}
