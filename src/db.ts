import { drizzle } from "drizzle-orm/bun-sql";
import { env } from "./env";
import { fromPromise, ResultAsync } from "neverthrow";

export const rawDb = drizzle(env.DATABASE_URL);

export const useDb = <T>(
  useFn: (db: typeof rawDb) => Promise<T>,
): ResultAsync<T, Error> => {
  const result = fromPromise(
    useFn(rawDb),
    (e) => new Error("Database Error", { cause: e }),
  );
  return result;
};
