import { Router, type IRouter, type Request, type Response } from "express";
import { db, ordersTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";

const router: IRouter = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function checkAuth(req: Request, res: Response): boolean {
  const pw = req.headers["x-admin-password"];
  if (!ADMIN_PASSWORD || pw !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

// GET /api/admin/orders — list all orders newest-first
router.get("/admin/orders", async (req, res) => {
  if (!checkAuth(req, res)) return;
  try {
    const orders = await db
      .select()
      .from(ordersTable)
      .orderBy(desc(ordersTable.createdAt));
    res.json(orders);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/admin/orders/:id — update order status
router.patch("/admin/orders/:id", async (req, res) => {
  if (!checkAuth(req, res)) return;
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "Invalid order id" });
    return;
  }
  const { status } = req.body as { status: string };
  const VALID_STATUSES = ["pending", "confirmed", "complete"];
  if (!VALID_STATUSES.includes(status)) {
    res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(", ")}` });
    return;
  }
  try {
    await db.update(ordersTable).set({ status }).where(eq(ordersTable.id, id));
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to update order status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
