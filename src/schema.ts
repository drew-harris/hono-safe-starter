import { pgTable, text } from "drizzle-orm/pg-core";

export const commits = pgTable("commits", {
  id: text("id").primaryKey().notNull(),
});
