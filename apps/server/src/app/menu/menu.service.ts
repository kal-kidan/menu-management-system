import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { FAIL, Resp, Succeed } from '../../common/constant';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.input.dto';
import { IMenuItem } from './dto/menu';
import { MenuException } from './menu.exception';
import { MenuItem } from '@prisma/client';

@Injectable()
export class MenuService {
    constructor(
        private exception: MenuException,
        private prismaService: PrismaService,
    ) { }

    // Create a new menu item
    async create(createMenuItemDto: CreateMenuDto): Promise<Resp<IMenuItem>> {
        const { parentId, ...rest } = createMenuItemDto;
        try {
            const menuItem = await this.prismaService.menuItem.create({
                data: {
                    ...rest,
                    parent: parentId ? { connect: { id: parentId } } : undefined,
                },
                include: { parent: true },
            });
            return Succeed(menuItem);
        } catch (error) {
            return FAIL(error.message, 500);
        }
    }
    async getAllRootMenus(): Promise<Resp<IMenuItem[]>> {
        try {
            const rootMenus = await this.prismaService.menuItem.findMany({
                where: {
                    parentId: null,
                },
                include: {
                    children: true,
                },
            });
            return Succeed(rootMenus);
        } catch (error) {
            return FAIL(error.message, 500);
        }
    }

    async findOneByIdOrFail(id: string): Promise<IMenuItem> {
        const result: any[] = await this.prismaService.$queryRaw`
          WITH RECURSIVE menu_hierarchy AS (
            SELECT id, name, parentId
            FROM "MenuItem"
            WHERE id = ${id} -- Start with the given menu item ID
            UNION
            SELECT child.id, child.name, child.parentId
            FROM "MenuItem" child
            INNER JOIN menu_hierarchy parent ON child.parentId = parent.id
          )
          SELECT * FROM menu_hierarchy;
        `;
        const menuTree = this.buildMenuTree(result);
        return menuTree;
    }

    async update(id: string, updateMenuItemDto: UpdateMenuDto): Promise<Resp<IMenuItem>> {
        try {
            const menuItem = await this.prismaService.menuItem.update({
                where: { id },
                data: {
                    ...updateMenuItemDto,
                },
                include: { parent: true },
            });
            return Succeed(menuItem);
        } catch (error) {
            return FAIL(error.message, 500);
        }
    }

    // Remove menu item
    async remove(id: string): Promise<Resp<boolean>> {
        try {
            await this.findOneByIdOrFail(id);
            await this.prismaService.menuItem.delete({
                where: { id },
            });
            return Succeed(true);
        } catch (error) {
            return FAIL(error.message, 500);
        }
    }

    buildMenuTree(flatMenuItems: any[]): IMenuItem {
        const menuMap = new Map<string, IMenuItem>();

        flatMenuItems.forEach(item => {
            menuMap.set(item.id, { ...item, children: [] });
        });

        let rootMenuItem = null;

        flatMenuItems.forEach(item => {
            const menuItem = menuMap.get(item.id);
            if (item.parentId) {
                const parent = menuMap.get(item.parentId);
                if (parent) {
                    parent.children.push(menuItem);
                }
            } else {
                rootMenuItem = menuItem;
            }
        });

        return rootMenuItem;
    }



}
