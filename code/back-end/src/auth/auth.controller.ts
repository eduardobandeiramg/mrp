import { Controller, Post, Body, UseGuards, Request, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private usersService: UsersService,
	) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	@ApiBody({ type: LoginDto }) 
	async login(@Request() req: Express.Request) {
		return this.authService.login(req.user);
	}

	@Public()
	@HttpCode(204)
	@Post('register')
	async register(@Body() body: CreateUserDto) {
		const user = await this.usersService.create(body);
		return user;
	}

	@Public()
	@Post('forgot-password')
	async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
		return this.authService.forgotPassword(forgotPasswordDto);
	}
}
