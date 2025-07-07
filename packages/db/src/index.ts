import { PrismaClient, AdminType as PrismaAdminTypeStr } from "@prisma/client";
import type { AdminType as PrismaAdminType } from "@prisma/client";

export const client = new PrismaClient();
export const AdminType = PrismaAdminTypeStr;
export type AdminType = PrismaAdminType;
