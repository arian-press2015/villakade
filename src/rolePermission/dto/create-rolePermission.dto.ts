import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class CreateRolePermissionDto {
  @IsPositive({ message: 'role_id must be a positive number' })
  @ApiProperty({
    example: 123,
    description: 'role_id of the RolePermission',
  })
  readonly role_id: number;

  @IsPositive({ message: 'permission_id must be a positive number' })
  @ApiProperty({
    example: 123,
    description: 'permission_id of the RolePermission',
  })
  readonly permission_id: number;
}
