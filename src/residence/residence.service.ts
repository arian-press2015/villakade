import { Injectable } from '@nestjs/common';
import {
  Residence,
  FilterResidenceDto,
  CreateResidenceDto,
  UpdateResidenceDto,
} from './dto';

@Injectable()
export class ResidenceService {
  async create(createResidenceDto: CreateResidenceDto): Promise<Residence> {
    const residence = {
      id: 1,
      host_id: createResidenceDto.host_id,
      title: createResidenceDto.title,
      type_id: createResidenceDto.type_id,
      location: createResidenceDto.location,
      price: createResidenceDto.price,
      active: createResidenceDto.active,
      city_id: createResidenceDto.city_id,
    };
    return residence;
  }

  async findAll(filterResidenceDto: FilterResidenceDto): Promise<Residence[]> {
    const residence = [
      {
        id: 1,
        host_id: 123,
        title: 'آپارتمان در شیراز',
        type_id: 123,
        location: 'شیراز دست چپ پلاک ۲',
        price: 200000,
        active: true,
        city_id: 123,
      },
    ];
    return residence;
  }

  async findOne(id: number): Promise<Residence> {
    const residence = {
      id,
      host_id: 123,
      title: 'آپارتمان در شیراز',
      type_id: 123,
      location: 'شیراز دست چپ پلاک ۲',
      price: 200000,
      active: true,
      city_id: 123,
    };
    return residence;
  }

  async update(
    id: number,
    updateResidenceDto: UpdateResidenceDto,
  ): Promise<Residence> {
    const residence = {
      id,
      host_id: updateResidenceDto.host_id || 123,
      title: updateResidenceDto.title || 'آپارتمان در شیراز',
      type_id: updateResidenceDto.type_id || 123,
      location: updateResidenceDto.location || 'شیراز دست چپ پلاک دو',
      price: updateResidenceDto.price || 200000,
      active: updateResidenceDto.active || true,
      city_id: updateResidenceDto.city_id || 123,
    };
    return residence;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}
