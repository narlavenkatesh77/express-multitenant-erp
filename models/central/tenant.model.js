import { DataTypes } from "sequelize";
import { centralDb } from "../../configs/db.js";

const Tenant = centralDb.define("Tenant", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  dbName: { type: DataTypes.STRING, allowNull: false },
  dbUser: { type: DataTypes.STRING, allowNull: false },
  dbPass: { type: DataTypes.STRING, allowNull: false },
  dbHost: { type: DataTypes.STRING, allowNull: false },
},
{
    tableName: "Tenants",  // <- tell Sequelize the actual table name
    timestamps: false,     // optional, if you don’t have createdAt/updatedAt
  }
);

export default Tenant;
