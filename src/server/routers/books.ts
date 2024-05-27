import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import prisma from '../../server/prisma';

export const booksRouter = router({
    getBooks: publicProcedure.query(async () => {
        console.info('getBooks');
        const books = await prisma.book.findMany();
        return books;
    })
})
