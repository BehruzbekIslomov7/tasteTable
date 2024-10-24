import { Module } from '@nestjs/common';
import { RestoranService } from './restoran.service';
import { RestoranController } from './restoran.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restoran, RestoranSchema } from './schemas/restoran.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: Restoran.name,
      schema: RestoranSchema,
    }
  ]),
  JwtModule.register({})
],
  controllers: [RestoranController],
  providers: [RestoranService],
  exports: [RestoranService]
})
export class RestoranModule {}
