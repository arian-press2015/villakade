import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ResidenceEntertainment,
  FilterResidenceEntertainmentDto,
  CreateResidenceEntertainmentDto,
  UpdateResidenceEntertainmentDto,
} from './dto';

const select = {
  residence_id: true,
  television: true,
  receiver: true,
  audio_system: true,
  swing: true,
  ping_pong: true,
  foosball: true,
  game_console: true,
  pool_table: true,
  game_board: true,
  treadmill: true,
  bicycle: true,
  beach_motor: true,
};

@Injectable()
export class ResidenceEntertainmentService {
  constructor(private prisma: PrismaService) {}
  async create(
    createResidenceEntertainmentDto: CreateResidenceEntertainmentDto,
  ): Promise<ResidenceEntertainment> {
    try {
      const residence_entertainment_attribute =
        await this.prisma.residence_entertainment_attribute.create({
          select,
          data: createResidenceEntertainmentDto,
        });
      return residence_entertainment_attribute;
    } catch (e) {
      console.log(
        'Error in ResidenceEntertainmentService.create()',
        e.code,
        e.meta,
      );
      throw e;
    }
  }

  async getCount(
    filterResidenceEntertainmentDto: FilterResidenceEntertainmentDto,
  ): Promise<number> {
    const where: {
      residence_id?: number;
      television?: boolean;
      receiver?: boolean;
      audio_system?: boolean;
      swing?: boolean;
      ping_pong?: boolean;
      foosball?: boolean;
      game_console?: boolean;
      pool_table?: boolean;
      game_board?: boolean;
      treadmill?: boolean;
      bicycle?: boolean;
      beach_motor?: boolean;
    } = {};
    if (filterResidenceEntertainmentDto.residence_id) {
      where.residence_id = parseInt(
        filterResidenceEntertainmentDto.residence_id,
      );
    } else if (filterResidenceEntertainmentDto.television) {
      where.television = filterResidenceEntertainmentDto.television === 'true';
    } else if (filterResidenceEntertainmentDto.receiver) {
      where.receiver = filterResidenceEntertainmentDto.receiver === 'true';
    } else if (filterResidenceEntertainmentDto.audio_system) {
      where.audio_system =
        filterResidenceEntertainmentDto.audio_system === 'true';
    } else if (filterResidenceEntertainmentDto.swing) {
      where.swing = filterResidenceEntertainmentDto.swing === 'true';
    } else if (filterResidenceEntertainmentDto.ping_pong) {
      where.ping_pong = filterResidenceEntertainmentDto.ping_pong === 'true';
    } else if (filterResidenceEntertainmentDto.foosball) {
      where.foosball = filterResidenceEntertainmentDto.foosball === 'true';
    } else if (filterResidenceEntertainmentDto.game_console) {
      where.game_console =
        filterResidenceEntertainmentDto.game_console === 'true';
    } else if (filterResidenceEntertainmentDto.pool_table) {
      where.pool_table = filterResidenceEntertainmentDto.pool_table === 'true';
    } else if (filterResidenceEntertainmentDto.game_board) {
      where.game_board = filterResidenceEntertainmentDto.game_board === 'true';
    } else if (filterResidenceEntertainmentDto.treadmill) {
      where.treadmill = filterResidenceEntertainmentDto.treadmill === 'true';
    } else if (filterResidenceEntertainmentDto.bicycle) {
      where.bicycle = filterResidenceEntertainmentDto.bicycle === 'true';
    } else if (filterResidenceEntertainmentDto.beach_motor) {
      where.beach_motor =
        filterResidenceEntertainmentDto.beach_motor === 'true';
    }

    const residence_entertainment_attributes =
      await this.prisma.residence_entertainment_attribute.count({
        where,
      });
    return residence_entertainment_attributes;
  }

  async findAll(
    filterResidenceEntertainmentDto: FilterResidenceEntertainmentDto,
  ): Promise<ResidenceEntertainment[]> {
    const where: {
      residence_id?: number;
      television?: boolean;
      receiver?: boolean;
      audio_system?: boolean;
      swing?: boolean;
      ping_pong?: boolean;
      foosball?: boolean;
      game_console?: boolean;
      pool_table?: boolean;
      game_board?: boolean;
      treadmill?: boolean;
      bicycle?: boolean;
      beach_motor?: boolean;
    } = {};
    if (filterResidenceEntertainmentDto.residence_id) {
      where.residence_id = parseInt(
        filterResidenceEntertainmentDto.residence_id,
      );
    } else if (filterResidenceEntertainmentDto.television) {
      where.television = filterResidenceEntertainmentDto.television === 'true';
    } else if (filterResidenceEntertainmentDto.receiver) {
      where.receiver = filterResidenceEntertainmentDto.receiver === 'true';
    } else if (filterResidenceEntertainmentDto.audio_system) {
      where.audio_system =
        filterResidenceEntertainmentDto.audio_system === 'true';
    } else if (filterResidenceEntertainmentDto.swing) {
      where.swing = filterResidenceEntertainmentDto.swing === 'true';
    } else if (filterResidenceEntertainmentDto.ping_pong) {
      where.ping_pong = filterResidenceEntertainmentDto.ping_pong === 'true';
    } else if (filterResidenceEntertainmentDto.foosball) {
      where.foosball = filterResidenceEntertainmentDto.foosball === 'true';
    } else if (filterResidenceEntertainmentDto.game_console) {
      where.game_console =
        filterResidenceEntertainmentDto.game_console === 'true';
    } else if (filterResidenceEntertainmentDto.pool_table) {
      where.pool_table = filterResidenceEntertainmentDto.pool_table === 'true';
    } else if (filterResidenceEntertainmentDto.game_board) {
      where.game_board = filterResidenceEntertainmentDto.game_board === 'true';
    } else if (filterResidenceEntertainmentDto.treadmill) {
      where.treadmill = filterResidenceEntertainmentDto.treadmill === 'true';
    } else if (filterResidenceEntertainmentDto.bicycle) {
      where.bicycle = filterResidenceEntertainmentDto.bicycle === 'true';
    } else if (filterResidenceEntertainmentDto.beach_motor) {
      where.beach_motor =
        filterResidenceEntertainmentDto.beach_motor === 'true';
    }

    const orderBy = {};
    if (filterResidenceEntertainmentDto.sort) {
      filterResidenceEntertainmentDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const residence_entertainment_attributes =
      await this.prisma.residence_entertainment_attribute.findMany({
        select,
        where,
        skip: filterResidenceEntertainmentDto.offset
          ? parseInt(filterResidenceEntertainmentDto.offset)
          : undefined,
        take: filterResidenceEntertainmentDto.limit
          ? parseInt(filterResidenceEntertainmentDto.limit)
          : undefined,
        orderBy,
      });
    return residence_entertainment_attributes;
  }

  async findOne(id: number): Promise<ResidenceEntertainment> {
    const residence_entertainment_attribute =
      await this.prisma.residence_entertainment_attribute.findUnique({
        select,
        where: { residence_id: id },
      });

    if (residence_entertainment_attribute === null) {
      throw new BadRequestException(
        'residence_entertainment_attribute not found',
      );
    }

    return residence_entertainment_attribute;
  }

  async update(
    id: number,
    updateResidenceEntertainmentDto: UpdateResidenceEntertainmentDto,
  ): Promise<ResidenceEntertainment> {
    try {
      const residence_entertainment_attribute =
        await this.prisma.residence_entertainment_attribute.update({
          select,
          data: {
            television: updateResidenceEntertainmentDto.television,
            receiver: updateResidenceEntertainmentDto.receiver,
            audio_system: updateResidenceEntertainmentDto.audio_system,
            swing: updateResidenceEntertainmentDto.swing,
            ping_pong: updateResidenceEntertainmentDto.ping_pong,
            foosball: updateResidenceEntertainmentDto.foosball,
            game_console: updateResidenceEntertainmentDto.game_console,
            pool_table: updateResidenceEntertainmentDto.pool_table,
            game_board: updateResidenceEntertainmentDto.game_board,
            treadmill: updateResidenceEntertainmentDto.game_board,
            bicycle: updateResidenceEntertainmentDto.bicycle,
            beach_motor: updateResidenceEntertainmentDto.beach_motor,
          },
          where: {
            residence_id: id,
          },
        });
      return residence_entertainment_attribute;
    } catch (e) {
      console.log(
        'Error in ResidenceEntertainmentService.update()',
        e.code,
        e.meta,
      );
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException(
          'residence_entertainment_attribute not found',
        );
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.residence_entertainment_attribute.delete({
        where: { residence_id: id },
      });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException(
          'residence_entertainment_attribute not found',
        );
      }
    }
  }
}
