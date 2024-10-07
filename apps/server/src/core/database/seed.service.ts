import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';  // Assuming you're using Prisma for database

@Injectable()
export class SeedService {
    constructor(private prisma: PrismaService) { }

    async seedMenus() {
        const menuCount = await this.prisma.menuItem.count();
        if (menuCount > 0) {
            console.log('Menu table is not empty. Skipping seed.');
            return;
        }

        console.log('Seeding menu data...');
        const menuData = [
            {
                name: 'System Management',
                children: [
                    {
                        name: 'Systems',
                        children: [
                            {
                                name: 'System Code',
                                children: [
                                    { name: 'Code Registration' }
                                ]
                            },
                            { name: 'Code Registration - 2' },
                            { name: 'Properties' },
                            {
                                name: 'Menus',
                                children: [
                                    { name: 'Menu Registration' }
                                ]
                            },
                            {
                                name: 'API List',
                                children: [
                                    { name: 'API Registration' },
                                    { name: 'API Edit' }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Users & Groups',
                        children: [
                            {
                                name: 'Users',
                                children: [
                                    { name: 'User Account Registration' }
                                ]
                            },
                            {
                                name: 'Groups',
                                children: [
                                    { name: 'User Group Registration' }
                                ]
                            },
                            { name: '사용자 승인' },
                            { name: '사용자 승인 상세' }
                        ]
                    }
                ]
            }
        ];

        await this.createMenuHierarchy(null, menuData);
        console.log('Menu data seeded.');
    }

    // Recursively create menu items and children
    private async createMenuHierarchy(parentId: string | null, items: any[]) {
        for (const item of items) {
            const newMenuItem = await this.prisma.menuItem.create({
                data: {
                    name: item.name,
                    parentId: parentId,
                },
            });
            if (item.children) {
                await this.createMenuHierarchy(newMenuItem.id, item.children);
            }
        }
    }
}
