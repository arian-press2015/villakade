import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FilterRolePermissionDto {
  @IsOptional()
  @IsNumberString({ message: 'offset must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'offset of the residence',
  })
  readonly offset?: string;

  @IsOptional()
  @IsNumberString({ message: 'limit must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'limit of the residence',
  })
  readonly limit?: string;

  @IsOptional()
  @IsNumberString({ message: 'role_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: '123',
    description: 'role_id of the RolePermission',
  })
  readonly role_id?: string;

  @IsOptional()
  @IsNumberString({ message: 'role_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: '123',
    description: 'permission_id of the RolePermission',
  })
  readonly permission_id?: string;
}
