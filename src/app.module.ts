import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { CategoryImageModule } from './categoryImage/categoryImage.module';
import { CityModule } from './city/city.module';
import configuration from './config/configuration';
import { ContactUsModule } from './contactUs/contactUs.module';
import { CustomerModule } from './customer/customer.module';
import { FaqModule } from './faq/faq.module';
import { HostModule } from './host/host.module';
import { OwnerModule } from './owner/owner.module';
import { PermissionModule } from './permission/permission.module';
import { ProvinceModule } from './province/province.module';
import { ResidenceModule } from './residence/residence.module';
import { ResidenceAirConditioningModule } from './residenceAirConditioning/residenceAirConditioning.module';
import { ResidenceAttributeModule } from './residenceAttribute/residenceAttribute.module';
import { ResidenceCookingModule } from './residenceCooking/residenceCooking.module';
import { ResidenceEntertainmentModule } from './residenceEntertainment/residenceEntertainment.module';
import { ResidenceFacilityModule } from './residenceFacility/residenceFacility.module';
import { ResidenceImageModule } from './residenceImage/residenceImage.module';
import { ResidenceParkingModule } from './residenceParking/residenceParking.module';
import { ResidencePriceModule } from './residencePrice/residencePrice.module';
import { ResidenceRoomModule } from './residenceRoom/residenceRoom.module';
import { ResidenceRuleModule } from './residenceRule/residenceRule.module';
import { ResidenceServeModule } from './residenceServe/residenceServe.module';
import { ResidenceWcBathroomModule } from './residenceWcBathroom/residenceWcBathroom.module';
import { RoleModule } from './role/role.module';
import { RolePermissionModule } from './rolePermission/rolePermission.module';
import { SupportModule } from './support/support.module';
import { TypeModule } from './type/type.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
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
    SupportModule,
    PermissionModule,
    RoleModule,
    RolePermissionModule,
    CustomerModule,
    OwnerModule,
    CategoryImageModule,
    ResidenceModule,
    ResidenceImageModule,
    ResidencePriceModule,
    ResidenceAttributeModule,
    ResidenceAirConditioningModule,
    ResidenceCookingModule,
    ResidenceEntertainmentModule,
    ResidenceFacilityModule,
    ResidenceParkingModule,
    ResidenceRoomModule,
    ResidenceRuleModule,
    ResidenceWcBathroomModule,
    ResidenceServeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
