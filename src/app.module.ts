import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import configuration from './config/configuration';
import { ContactUsModule } from './contactUs/contactUs.module';
import { FaqModule } from './faq/faq.module';
import { HostModule } from './host/host.module';
import { ProvinceModule } from './province/province.module';
import { ResidenceModule } from './residence/residence.module';
import { SupportModule } from './support/support.module';
import { TypeModule } from './type/type.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    CategoryModule,
    ProvinceModule,
    CityModule,
    ContactUsModule,
    FaqModule,
    HostModule,
    TypeModule,
    ResidenceModule,
    SupportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
