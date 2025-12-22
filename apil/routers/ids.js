import express from "express";
const router = express.Router();

router.get("/ids", (req, res) => {
  res.status(200).json(ids);
});

export default router;