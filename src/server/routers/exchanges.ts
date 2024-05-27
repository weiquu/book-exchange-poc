import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "../../server/prisma";

export const exchangesRouter = router({
  getMyExchanges: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const exchanges = await prisma.exchange.findMany({
        where: {
          OR: [
            { leftBook: { listedById: input.userId } },
            { rightBook: { listedById: input.userId } },
          ],
        },
        include: {
          leftBook: true,
          rightBook: true,
        },
      });
      return [
        exchanges.filter((exchange) => exchange.status === "PENDING"),
        exchanges.filter((exchange) => exchange.status !== "PENDING"),
      ];
    }),
  createExchange: publicProcedure
    .input(
      z.object({
        leftBookId: z.string(),
        rightBookId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: if exchange offer exists for opposite direction, should auto accept
      const exchange = await prisma.exchange.create({
        data: {
          leftBookId: input.leftBookId,
          rightBookId: input.rightBookId,
          status: "PENDING",
        },
      });
      return exchange;
    }),
  updateExchange: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.union([z.literal("ACCEPTED"), z.literal("REJECTED")]),
      })
    )
    .mutation(async ({ input }) => {
      const exchange = await prisma.exchange.update({
        where: { id: input.id },
        data: {
          status: input.status,
        },
      });
      // TODO: if exchange is accepted, update books - isAvailable for both should be false
      return exchange;
    }),
});
