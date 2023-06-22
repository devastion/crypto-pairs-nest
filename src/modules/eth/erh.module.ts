import { Module } from "@nestjs/common";
import { ETHUSDService } from "./eth.service";
import { ETHUSDController } from "./eth.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [],
  providers: [ETHUSDService, PrismaService],
  controllers: [ETHUSDController],
})
export class ETHUSDModule {}
