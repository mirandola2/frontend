import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: {
        include: "**/*.md",
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
    media: defineCollection({
      type: "data",
      source: "_media.csv",
      schema: z.object({
        title: z.string(),
        url: z.string().url(),
        type: z.enum(["image", "video"]),
        id: z.string(),
        year: z.number().optional(),
      }),
    }),
    capi: defineCollection({
      type: "data",
      source: "_capi.csv",
      schema: z.object({
        nome: z.string(),
        nomeCaccia: z.string().optional(),
        ruolo: z.string(),
        staff: z.string(),
        coca: z.number(),
        desc: z.string().optional(),
        img: z.string(),
        order: z.number(),
      }),
    }),
    quotes: defineCollection({
      type: "data",
      source: "_quotes.csv",
      schema: z.object({
        text: z.string(),
        type: z.string(),
        author: z.string().optional(),
      }),
    }),
  },
});
