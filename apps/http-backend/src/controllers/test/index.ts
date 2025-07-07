import { client, AdminType } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { ADMIN_JWT_PASSWORD } from "../../config";
export async function createAdmin(number: string, name: string){
    const admin = await client.admin.create({
        data: {
            number,
            name,
            verified : true,
            type: AdminType.Creator
        }
    })
    
    const token = jwt.sign({
        userId: admin.id,
    },ADMIN_JWT_PASSWORD)
}