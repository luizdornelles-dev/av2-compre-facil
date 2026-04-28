-- CreateTable
CREATE TABLE "Mail" (
    "id" SERIAL NOT NULL,
    "idUser" TEXT NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "orderValue" DOUBLE PRECISION NOT NULL,
    "mailTo" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mail_pkey" PRIMARY KEY ("id")
);
