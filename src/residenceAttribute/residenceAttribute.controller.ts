import {
  Controller,
  Get,
  Param,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResidenceAttributeService } from './residenceAttribute.service';
import { ResidenceAttribute } from './dto';
import { HostJwtGuard } from '../auth/guard';
import { ResidenceService } from '../residence/residence.service';

@ApiTags('ResidenceAttribute')
@Controller('residenceAttribute')
export class ResidenceAttributeController {
  constructor(
    private readonly residenceAttributeService: ResidenceAttributeService,
    private readonly residenceService: ResidenceService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Get the ResidenceAttribute data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidenceAttribute associated with given id',
    type: ResidenceAttribute,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number|residence not found',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceattribute not found',
  })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<ResidenceAttribute> {
    const host_id = req.hostInfo;
    const isHost = await this.residenceService.checkHost(+id, host_id);

    if (isHost) {
      throw new UnauthorizedException("you don't have permission to do that");
    }

    return this.residenceAttributeService.findOne(+id);
  }
}
