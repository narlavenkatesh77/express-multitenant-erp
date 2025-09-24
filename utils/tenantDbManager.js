import { Sequelize } from "sequelize";
import Tenant from "../models/central/tenant.model.js";
import productModel from "../models/tenant/product.model.js";

const tenantConnections = {};

export async function getTenantDb(tenantId) {
  if (tenantConnections[tenantId]) return tenantConnections[tenantId];

  const tenant = await Tenant.findByPk(tenantId);
  if (!tenant) throw new Error("Tenant not found");

  const sequelize = new Sequelize(
    tenant.dbName,
    tenant.dbUser,
    tenant.dbPass,
    {
      host: tenant.dbHost,
      dialect: "postgres",
      port: tenant.dbPort || 5432,
      logging: false,
    }
  );

  const Product = productModel(sequelize);
  await sequelize.sync();

  tenantConnections[tenantId] = { sequelize, Product };
  return tenantConnections[tenantId];
}
