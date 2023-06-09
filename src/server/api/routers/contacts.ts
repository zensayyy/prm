import { Prisma } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const contactsRouter = createTRPCRouter({
  getTotalContacts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.contact.count();
  }),
  getContactById: publicProcedure
    .input(z.number())
    .query(({ input, ctx }) => {
      return ctx.prisma.contact.findUnique({
        where: { id: input },
        include: {
          channels: true,
          likes: true,
          dislikes: true,
          notes: true,
          activities: true,
          tasks: true,
          reminders: true,
          tags: true
        }
      })
    }),
  getContactsByCursor: publicProcedure
    .input(z.object({
      take: z.number().min(1).max(100).nullish(),
      cursor: z.number().nullish()
    }))
    .query(async ({ input, ctx }) => {
      const takeNum = input.take ?? 20;
      const { cursor } = input;

      const items = await ctx.prisma.contact.findMany({
        take: takeNum + 1,
        cursor: cursor ? {
          id: cursor
        } : undefined,
        orderBy: {
          id: "asc"
        }
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > takeNum) {
        const nextItem = items.pop()
        nextCursor = nextItem!.id;
      }
      return {
        items,
        nextCursor,
      };
    })

})
