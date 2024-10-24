import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Restoran, RestoranDocument } from '../restoran/schemas/restoran.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Tables, TablesDocument } from './schemas/table.schema';

import * as QRCode from "qrcode"
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class TablesService {

  constructor(
    @InjectModel(Restoran.name) private restoranModel: Model<RestoranDocument>,
    @InjectModel(Tables.name) private tablesModel: Model<TablesDocument>,
    private readonly jwtService: JwtService,
   ) {}

   async generateQrCode(text: string):Promise<string> {
     try {
      // Generate QR Code  as a data  URL (Base64)
     const qrCode = await QRCode.toDataURL(text);
     return qrCode;
     } catch (error) {
      throw new Error("Failed to generate QR code");
     }
   }

   async generateQrCodeFile(text: string, fileName: string): Promise<string> {
    try {
      const qrCodeBuffer = await QRCode.toBuffer(text);
      const filePath = path.join(
        __dirname,
        '../public/qr-codes',
        `${fileName}.png`,
      )
      fs.mkdirSync(path.dirname(filePath), { recursive: true})

      fs.writeFileSync(filePath, qrCodeBuffer);

      return filePath;
    } catch (error) {
      throw new Error("Failed to generate or save QR code");
    }
   }

  async create(createTableDto: CreateTableDto) {
    const { restoran_id } = createTableDto;
    const restoran = await this.restoranModel.findById(restoran_id);
    if (!restoran) {
      throw new BadRequestException("Bunday restoran yoq")
    }
    const newTable = await this.tablesModel.create(createTableDto);

    const baseUrl = `${process.env.API_URL}:${process.env.PORT}`;
    const link = `${baseUrl}/${restoran._id}/${newTable._id}`;
    await this.generateQrCodeFile(link, String(newTable._id));
    // const qrCode = await this.generateQrCode(link);
    // newTable.0qr_code = link;
    await newTable.save();


    restoran.tables.push(newTable);
    await restoran.save();

    return newTable;
  }

  findAll() {
    return this.tablesModel.find().populate('restoran_id');
  }

  findOne(id: number) {
    return `This action returns a #${id} table`;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
