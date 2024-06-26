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
            { requestedBook: { listedById: input.userId } },
            { requesterBook: { listedById: input.userId } },
          ],
        },
        include: {
          requestedBook: true,
          requesterBook: true,
        },
      });
      return exchanges;
    }),
  createExchange: publicProcedure
    .input(
      z.object({
        requestedBookId: z.string(),
        requesterBookId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: if exchange offer exists for opposite direction, should auto accept
      const exchange = await prisma.exchange.create({
        data: {
          requestedBookId: input.requestedBookId,
          requesterBookId: input.requesterBookId,
          status: "PENDING",
        },
      });
      return exchange;
    }),
  updateExchangeStatus: publicProcedure
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

      if (input.status === "REJECTED") {
        return exchange;
      }

      await Promise.all([
        prisma.book.update({
          where: { id: exchange.requestedBookId },
          data: {
            isAvailable: false,
          },
        }),
        prisma.book.update({
          where: { id: exchange.requesterBookId },
          data: {
            isAvailable: false,
          },
        }),
        prisma.exchange.updateMany({
          where: {
            OR: [
              { requestedBookId: exchange.requestedBookId },
              { requesterBookId: exchange.requestedBookId },
              { requestedBookId: exchange.requesterBookId },
              { requesterBookId: exchange.requesterBookId },
            ],
            status: "PENDING",
          },
          data: {
            status: "REJECTED",
          },
        }),
      ]);

      return exchange;
    }),
  updateExchangeBook: publicProcedure
    .input(
      z.object({
        id: z.string(),
        requesterBookId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const exchange = await prisma.exchange.update({
        where: { id: input.id },
        data: {
          requesterBookId: input.requesterBookId,
        },
      });
      return exchange;
    }),
  deleteExchange: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const exchange = await prisma.exchange.delete({
        where: { id: input.id },
      });
      return exchange;
    }),
});
