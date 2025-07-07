import { Router } from "express";
import { client, AdminType } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { ADMIN_JWT_PASSWORD } from "../../../config";

const router: Router = Router();

router.post("/create-admin" , async (req, res) => {
    const number = req.body.number;
    const name = req.body.name;

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
    res.json({
        id: admin.id
    })
});