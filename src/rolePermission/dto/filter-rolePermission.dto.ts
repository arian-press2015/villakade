import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FilterRolePermissionDto {
  @IsOptional()
  @IsNumberString({ message: 'role_id must be a positive number' })
  @ApiProperty({
    example: '123',
    description: 'role_id of the RolePermission',
  })
  readonly role_id?: string;

  @IsOptional()
  @IsNumberString({ message: 'role_id must be a positive number' })
  @ApiProperty({
    example: '123',
    description: 'permission_id of the RolePermission',
  })
  readonly permission_id?: string;
}
