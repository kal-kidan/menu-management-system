import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.input.dto';
import { MenuItem } from '@prisma/client';
import { IMenuItem } from './dto/menu';

@Controller('menu')
@ApiTags('Menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiBody({ type: CreateMenuDto })
  @ApiResponse({
    status: 201,
    description: 'Menu item created successfully',
  })
  async createMenu(@Body() createDto: CreateMenuDto): Promise<IMenuItem> {
    const resp = await this.menuService.create(createDto);
    if (!resp.ok) throw new HttpException(resp.errMessage, resp.code);
    return resp.val;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update menu item' })
  @ApiBody({ type: UpdateMenuDto })
  @ApiResponse({
    status: 200,
    description: 'Menu item updated successfully',
  })
  async updateMenu(@Body() updateDto: UpdateMenuDto, @Param('id') id: string): Promise<IMenuItem> {
    const resp = await this.menuService.update(id, updateDto,);
    if (!resp.ok) throw new HttpException(resp.errMessage, resp.code);
    return resp.val;
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all menus' })
  @ApiResponse({
    status: 200,
    description: 'Menus retrieved successfully',
  })
  async findAllMenus(): Promise<IMenuItem[]> {
    const resp = await this.menuService.getAllRootMenus();
    return resp.val;
  }



  @Get(':id')
  @ApiOperation({ summary: 'Find a menu by ID' })
  @ApiResponse({
    status: 200,
    description: 'Menu retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  async findOne(@Param('id') id: string): Promise<IMenuItem> {
    const res = await this.menuService.findOneByIdOrFail(id);
     if (!res?.ok) throw new HttpException(res?.errMessage, res?.code);
    return res.val;
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu item by ID' })
  @ApiResponse({
    status: 204,
    description: 'Menu item deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  async deleteMenu(@Param('id') id: string): Promise<any> {
    const res = await this.menuService.remove(id);
    if (!res?.ok) throw new HttpException(res?.errMessage, res?.code);
    return res.val;
  }
}
