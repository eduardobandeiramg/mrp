import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DatabaseModule } from './database/database.module';
import { LineModule } from './line/line.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { MaterialsModule } from './materials/materials.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		UsersModule,
		ProductsModule,
		LineModule,
		AuthModule,
		MaterialsModule
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
