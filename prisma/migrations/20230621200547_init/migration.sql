-- CreateTable
CREATE TABLE "BTCUSD" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "BTCUSD_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ETHUSD" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "ETHUSD_pkey" PRIMARY KEY ("id")
);
