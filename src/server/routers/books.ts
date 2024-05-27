import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "../../server/prisma";

export const booksRouter = router({
  getAllListings: publicProcedure.query(async () => {
    const books = await prisma.book.findMany();
    return books;
  }),
  getMyListings: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const books = await prisma.book.findMany({
        where: {
          listedById: input.userId,
        },
      });
      return books;
    }),
  createListing: publicProcedure
    .input(
      z.object({
        author: z.string(),
        title: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const book = await prisma.book.create({
        data: {
          title: input.title,
          author: input.author,
          listedById: input.userId,
        },
      });
      return book;
    }),
});
