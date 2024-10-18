import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class GenericService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: any, data: DeepPartial<T>): Promise<T> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    this.repository.merge(entity, data);
    return this.repository.save(entity);
  }

  async delete(id: any): Promise<void> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    await this.repository.remove(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: any): Promise<T> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }
}
