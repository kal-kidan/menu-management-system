// src/database/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SeedService } from './seed.service';

@Global()
@Module({
    providers: [PrismaService, SeedService],
    exports: [PrismaService],
})
export class PrismaModule { }
