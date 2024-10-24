import { Injectable } from '@nestjs/common';
import { CreateRestoranDto } from './dto/create-restoran.dto';
import { UpdateRestoranDto } from './dto/update-restoran.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restoran, RestoranDocument } from './schemas/restoran.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RestoranService {

  constructor(
    @InjectModel(Restoran.name) private restoranModel: Model<RestoranDocument>,
    private readonly jwtService: JwtService,
   ) {}

   
  create(createRestoranDto: CreateRestoranDto) {
    return this.restoranModel.create(createRestoranDto);
  }

  findAll() {
    return this.restoranModel.find().populate('tables');
  }

  findOne(id: number) {
    return `This action returns a #${id} restoran`;
  }

  update(id: number, updateRestoranDto: UpdateRestoranDto) {
    return `This action updates a #${id} restoran`;
  }

  remove(id: number) {
    return `This action removes a #${id} restoran`;
  }
}
