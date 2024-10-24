import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestoranService } from './restoran.service';
import { CreateRestoranDto } from './dto/create-restoran.dto';
import { UpdateRestoranDto } from './dto/update-restoran.dto';

@Controller('restoran')
export class RestoranController {
  constructor(private readonly restoranService: RestoranService) {}

  @Post()
  create(@Body() createRestoranDto: CreateRestoranDto) {
    return this.restoranService.create(createRestoranDto);
  }

  @Get()
  findAll() {
    return this.restoranService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restoranService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestoranDto: UpdateRestoranDto) {
    return this.restoranService.update(+id, updateRestoranDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restoranService.remove(+id);
  }
}
