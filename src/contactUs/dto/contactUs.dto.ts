import { ApiProperty } from '@nestjs/swagger';

export class ContactUs {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'arian.press2015@gmail.com',
    description: 'email of the ContactUs',
  })
  readonly email: string;

  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the ContactUs',
  })
  readonly phone: string;

  @ApiProperty({
    example: 'AP2015',
    description: 'full_name of the ContactUs',
  })
  readonly full_name: string;

  @ApiProperty({
    example: 'Help me get a villa',
    description: 'description of the ContactUs',
  })
  readonly description: string;
}
