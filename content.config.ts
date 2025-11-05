import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: {
        include: "**",
        exclude: ["blog/**"],
        schema: z.object({
          title: z.string(),
          date: z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
          }),
          description: z.string().optional(),
          img: z.string().optional(),
          category: z.string().optional(),
        }),
      },
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        date: z.string().refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        }),
        description: z.string().optional(),
        img: z.string().optional(),
        category: z.string().optional(),
      }),
    }),
  },
});
