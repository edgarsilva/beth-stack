import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { performance } from "perf_hooks";
import * as util from "util";

import { env } from "@/env";

export * from "@prisma/client";

// Create a new instance of the libSQL database client
const libsqlClient = createClient({
  // url: "file:./db/local_replica.db",
  // syncUrl: process.env.TURSO_DATABASE_URL,
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Create a Prisma "adapter" for libSQL
const adapter = new PrismaLibSQL(libsqlClient);

export async function tursoSync() {
  return libsqlClient.sync();
}

function createPrismaClient() {
  // Sync the remote db with the embedded local replica
  tursoSync();

  return new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  // Pass the adapter option to the Prisma Client instance
  // return new PrismaClient({
  //   adapter,
  //   log:
  //     env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  // }).$extends({
  //   /**
  //    * Query logging Client extension
  //    * Source: https://github.com/prisma/prisma-client-extensions/tree/main/query-logging
  //    */
  //   query: {
  //     $allModels: {
  //       async $allOperations({ operation, model, args, query }) {
  //         const start = performance.now();
  //         const result = await query(args);
  //         const end = performance.now();
  //         const time = end - start;
  //         console.log(
  //           util.inspect(
  //             { model, operation, time, args },
  //             { showHidden: false, depth: null, colors: true },
  //           ),
  //         );
  //         return result;
  //       },
  //     },
  //   },
  // });
}

// Patch to fix BigInt serialization to JSON
declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

type PrismaClientSingleton = ReturnType<typeof createPrismaClient>;

// Ensure to reuse prisma client on module reload in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
