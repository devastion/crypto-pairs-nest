import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ETHUSD, Prisma } from "@prisma/client";
import { Cron } from "@nestjs/schedule";
import axios from "axios";

interface CoinApiResponse {
  data: {
    priceUsd: string;
  };
  timestamp: number;
}

@Injectable()
export class ETHUSDService {
  constructor(private prisma: PrismaService) {}

  async addEthUsdPair(data: Prisma.ETHUSDCreateInput): Promise<ETHUSD> {
    return this.prisma.eTHUSD.create({ data });
  }

  async fetchAllEthUsdPairs(params: {
    orderBy?: Prisma.ETHUSDOrderByWithRelationInput;
  }) {
    const { orderBy } = params;
    return this.prisma.eTHUSD.findMany({ orderBy });
  }

  // 12:45 everyday
  @Cron("45 12 * * *")
  async handleCron() {
    const fetchData = await axios.get(
      "https://api.coincap.io/v2/assets/ethereum",
    );
    const data = (await fetchData.data) as unknown as CoinApiResponse;
    this.addEthUsdPair({
      price: data["data"]["priceUsd"],
      time: new Date(data["timestamp"]),
    });
    console.log("fetched");
  }
}
