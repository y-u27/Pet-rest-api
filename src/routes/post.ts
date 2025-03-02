import { Router, Request, Response } from "express";
import { connectDB } from "../config/db";

const router = Router();

// ~/api/petのpostデータ作成
router.post("/api/pet",async(req:Request,res:Response) => {
  
})