import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { EntityManager, Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MaterialsService {

	constructor(
		@InjectRepository(Material)
		private readonly materialsRepository: Repository<Material>,
		private readonly entityManager: EntityManager
	) {}

	async create(createMaterialDto: CreateMaterialDto) {
		const material = new Material(createMaterialDto)
		return await this.entityManager.save(material);
	}

	async findAll() {
		return await this.materialsRepository.find();
	}

	async findOne(id: string) {
		return await this.materialsRepository.findOneBy({id:id});
	}

	async update(id: string, updateMaterialDto: UpdateMaterialDto) {
		const material = await this.materialsRepository.findOneBy({id:id});
		material.code = updateMaterialDto.code;
		return await this.entityManager.save(material);
	}

	async remove(id: string) {
		return await this.materialsRepository.delete({id:id});
	}
}
