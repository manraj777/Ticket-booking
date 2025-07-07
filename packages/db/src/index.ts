import { PrismaClient, AdminType as PrismaAdminType } from "@prisma/client";
export const client = new PrismaClient();
export const AdminType = PrismaAdminType;
