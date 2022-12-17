import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../customer/repository/sequelize/customer.model";
import { ProductModel } from "../product/repository/sequelize/product.model";
import { customerRoute } from "./routes/customer.route";
import { productRoute } from "./routes/product.route";

const app: Express = express();

app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);

let sequelize: Sequelize;

async function setupDatabase() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setupDatabase();

export { app, sequelize };
