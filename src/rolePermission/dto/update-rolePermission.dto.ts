import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class UpdateRolePermissionDto {
  @IsOptional()
  @IsPositive({ message: 'role_id must be a positive number' })
  @ApiProperty({
    example: 123,
    description: 'role_id of the RolePermission',
  })
  readonly role_id?: number;

  @IsOptional()
  @IsPositive({ message: 'permission_id must be a positive number' })
  @ApiProperty({
    example: 123,
    description: 'permission_id of the RolePermission',
  })
  readonly permission_id?: number;
}
