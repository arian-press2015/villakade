import { Injectable } from '@nestjs/common';
import {
  ResidenceImage,
  FilterResidenceImageDto,
  CreateResidenceImageDto,
  UpdateResidenceImageDto,
} from './dto';

@Injectable()
export class ResidenceImageService {
  async create(
    createResidenceImageDto: CreateResidenceImageDto,
  ): Promise<ResidenceImage> {
    const residenceImage = {
      residence_id: createResidenceImageDto.residence_id,
      url: createResidenceImageDto.url,
      width: createResidenceImageDto.width,
      height: createResidenceImageDto.height,
    };
    return residenceImage;
  }

  async findAll(
    filterResidenceImageDto: FilterResidenceImageDto,
  ): Promise<ResidenceImage[]> {
    const residenceImage = [
      {
        residence_id: 1,
        url: '/fake/image/url',
        width: 480,
        height: 640,
      },
    ];
    return residenceImage;
  }

  async findOne(id: number): Promise<ResidenceImage> {
    const residenceImage = {
      residence_id: id,
      url: '/fake/image/url',
      width: 480,
      height: 640,
    };
    return residenceImage;
  }

  async update(
    id: number,
    updateResidenceImageDto: UpdateResidenceImageDto,
  ): Promise<ResidenceImage> {
    const residenceImage = {
      residence_id: updateResidenceImageDto.residence_id,
      url: '/fake/image/url',
      width: 480,
      height: 640,
    };
    return residenceImage;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}
