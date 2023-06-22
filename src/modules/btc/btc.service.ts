import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BTCUSD, Prisma } from "@prisma/client";
import { Cron } from "@nestjs/schedule";
import axios from "axios";

interface CoinApiResponse {
  data: {
    priceUsd: string;
  };
  timestamp: number;
}

@Injectable()
export class BTCUSDService {
  constructor(private prisma: PrismaService) {}

  async addBtcUsdPair(data: Prisma.BTCUSDCreateInput): Promise<BTCUSD> {
    return this.prisma.bTCUSD.create({ data });
  }

  async fetchAllBtcUsdPairs(params: {
    orderBy?: Prisma.BTCUSDOrderByWithRelationInput;
  }) {
    const { orderBy } = params;
    return this.prisma.bTCUSD.findMany({ orderBy });
  }

  // every minute
  @Cron("* * * * *")
  async handleCron() {
    const fetchData = await axios.get(
      "https://api.coincap.io/v2/assets/bitcoin",
    );
    const data = (await fetchData.data) as unknown as CoinApiResponse;
    this.addBtcUsdPair({
      price: data["data"]["priceUsd"],
      time: new Date(data["timestamp"]),
    });
    console.log("fetched");
  }
}
