import { Module } from "@nestjs/common";
import { BTCUSDService } from "./btc.service";
import { BTCUSDController } from "./btc.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [],
  providers: [BTCUSDService, PrismaService],
  controllers: [BTCUSDController],
})
export class BTCUSDModule {}
