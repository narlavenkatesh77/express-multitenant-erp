import { getTenantDb } from "../utils/tenantDbManager.js";

export default async function tenantMiddleware(req, res, next) {
  try {
    const tenantId = req.headers["x-tenant-id"]; // client must send tenant ID
    if (!tenantId) return res.status(400).json({ error: "Tenant ID missing" });

    // req.tenantDb is important
    req.tenantDb = await getTenantDb(tenantId);
    next();
  } catch (err) {
    next(err);
  }
}
