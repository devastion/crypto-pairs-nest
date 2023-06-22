import { Controller, Get } from "@nestjs/common";
import { BTCUSDService } from "./btc.service";
import { BTCUSD as BTCUSDModel } from "@prisma/client";

@Controller("btcusd")
export class BTCUSDController {
  constructor(private readonly btcUsdService: BTCUSDService) {}

  @Get()
  async getAllBtcPairs(): Promise<BTCUSDModel[]> {
    return this.btcUsdService.fetchAllBtcUsdPairs({
      orderBy: { time: "asc" },
    });
  }
}
