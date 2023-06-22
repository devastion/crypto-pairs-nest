import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();
interface CoinApiHistoryData {
  priceUsd: string;
  time: number;
  date: string;
}

interface CoinApiHistory {
  data: CoinApiHistoryData[];
  timestamp: number;
}

async function fetchBtcHistory() {
  const fetchData = await axios.get(
    "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1",
  );
  const data = fetchData.data as unknown as CoinApiHistory;

  return data;
}

async function fetchEthHistory() {
  const fetchData = await axios.get(
    "https://api.coincap.io/v2/assets/ethereum/history?interval=d1",
  );
  const data = fetchData.data as unknown as CoinApiHistory;

  return data;
}

async function main() {
  const dataBtc = await fetchBtcHistory();
  dataBtc["data"].forEach(async (el, index) => {
    await prisma.bTCUSD.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        price: el["priceUsd"],
        time: new Date(el["time"]),
      },
    });
  });

  const dataEth = await fetchEthHistory();
  dataEth["data"].forEach(async (el, index) => {
    await prisma.eTHUSD.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        price: el["priceUsd"],
        time: new Date(el["time"]),
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
