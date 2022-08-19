import { ApiProperty } from '@nestjs/swagger';

export class RolePermission {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 123,
    description: 'role_id of the RolePermission',
  })
  readonly role_id: number;

  @ApiProperty({
    example: 123,
    description: 'permission_id of the RolePermission',
  })
  readonly permission_id: number;
}
