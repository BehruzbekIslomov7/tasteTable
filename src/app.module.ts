import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { RestoranModule } from './restoran/restoran.module';
import { MenuModule } from './menu/menu.module';
import { MenuCategoryModule } from './menu_category/menu_category.module';
import { TablesModule } from './tables/tables.module';


@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule,
    RestoranModule,
    MenuModule,
    MenuCategoryModule,
    TablesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
