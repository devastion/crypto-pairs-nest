import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { PrismaModule } from "./prisma/prisma.module";
import { BTCUSDModule } from "./btc/btc.module";
import { ETHUSDModule } from "./eth/erh.module";
@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, BTCUSDModule, ETHUSDModule],
})
export class AppModule {}
