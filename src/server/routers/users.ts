import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "../../server/prisma";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

export const usersRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const salt = genSaltSync(10);
      const hash = hashSync(input.password, salt);
      const user = await prisma.user.create({
        data: {
          email: input.email,
          password: hash,
          name: input.name,
        },
      });
      return user;
    }),
  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const salt = genSaltSync(10);
      const hash = hashSync(input.password, salt);
      const user = await prisma.user.update({
        where: { id: input.id },
        data: {
          email: input.email,
          password: hash,
          name: input.name,
        },
      });
      return user;
    }),
  getUserById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.id },
      });
      return user;
    }),
  validateLogin: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (!user || !compareSync(input.password, user.password)) {
        return null;
      }
      return user;
    }),
});
