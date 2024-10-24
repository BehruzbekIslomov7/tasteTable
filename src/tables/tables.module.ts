import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tables, TablesSchema } from './schemas/table.schema';
import { JwtModule } from '@nestjs/jwt';
import { Restoran, RestoranSchema } from '../restoran/schemas/restoran.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tables.name,
        schema: TablesSchema,
      }
    ]),MongooseModule.forFeature([
      {
        name: Restoran.name,
        schema: RestoranSchema,
      }
    ]), JwtModule.register({})
  ],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
