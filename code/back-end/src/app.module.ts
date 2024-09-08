import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MaterialsModule } from './materials/materials.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		MaterialsModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
