import { Module } from '@nestjs/common';
import { MenuCategoryService } from './menu_category.service';
import { MenuCategoryController } from './menu_category.controller';

@Module({
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService],
})
export class MenuCategoryModule {}
