import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from "bcrypt"
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AdminService {
  constructor(
   @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
   private readonly jwtService: JwtService,
  ) {}

  async generateTokens(admin: AdminDocument) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_owner: admin.is_creator,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }


  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password){
      throw new BadRequestException('Parollar mos emas')
    }
    const hashed_password = await bcrypt.hash(password, 7)

    const newAdmin = await this.adminModel.create({ ...createAdminDto, hashed_password});

    const tokens = await this.generateTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    newAdmin.hashed_refresh_token = hashed_refresh_token;
    await newAdmin.save(); 
    return {
      message: "Admin qo'shildi",
      id: newAdmin._id,
      access_token: tokens.access_token,
    }
  }

  findAll() {
    return this.adminModel.find();
  }

  findOne(id: string) {
    return this.adminModel.findById(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true});
  }

  remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
    // return this.adminModel.deleteOne({ _id: id});
  }
}
