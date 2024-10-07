import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// @ts-ignore
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['error', 'warn'],
    });
  }

  async onModuleInit(): Promise<void> {
    // @ts-ignore
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    // @ts-ignore
    await this.$disconnect();
  }
}
