import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterRolePermissionDto {
  @IsOptional()
  @IsString({ message: 'role_id must be a positive number' })
  @ApiProperty({
    example: 123,
    description: 'role_id of the RolePermission',
  })
  readonly role_id?: string;

  @IsOptional()
  @IsString({ message: 'role_id must be a positive number' })
  @ApiProperty({
    example: 123,
    description: 'permission_id of the RolePermission',
  })
  readonly permission_id?: string;
}
