import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRolePermissionDto {
  @IsNotEmpty({ message: 'role_id is required' })
  @IsPositive({ message: 'role_id must be a positive number' })
  @ApiProperty({
    example: 123,
    description: 'role_id of the RolePermission',
  })
  readonly role_id: number;

  @IsNotEmpty({ message: 'permission_id is required' })
  @IsPositive({ message: 'permission_id must be a positive number' })
  @ApiProperty({
    example: 123,
    description: 'permission_id of the RolePermission',
  })
  readonly permission_id: number;
}
