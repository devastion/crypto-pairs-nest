import { Controller, Get } from "@nestjs/common";
import { ETHUSDService } from "./eth.service";
import { ETHUSD as ETHUSDModel } from "@prisma/client";

@Controller("ethusd")
export class ETHUSDController {
  constructor(private readonly ethUsdService: ETHUSDService) {}

  @Get()
  async getAllEthPairs(): Promise<ETHUSDModel[]> {
    return this.ethUsdService.fetchAllEthUsdPairs({
      orderBy: { time: "asc" },
    });
  }
}
