import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MaterialsModule } from './materials/materials.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		MaterialsModule,
		UsersModule,
		AuthModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
