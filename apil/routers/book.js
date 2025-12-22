import express from "express";
import { createBook, deleteBook, getallBook, getBook, updateBook } from "../controllers/book.js";
import { verifyadmin } from "../utils/verification.js";
import { verifyToken } from '../utils/verification.js';

const router = express.Router();

router.post("/:eventid", verifyadmin, createBook);
router.put("/:id", verifyadmin, updateBook);
router.delete("/:id/:eventid", verifyadmin, deleteBook);
router.get("/:id", getBook);
router.get("/", getallBook);

export default router;