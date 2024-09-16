import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		UsersModule,
		AuthModule
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	],
})
export class AppModule {}
