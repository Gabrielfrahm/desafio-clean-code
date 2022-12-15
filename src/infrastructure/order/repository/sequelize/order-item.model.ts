import {
  Model,
  Table,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { OrderModel } from "./order.model";
import { ProductModel } from "../../../product/repository/sequelize/product.model";

@Table({
  tableName: "order_items",
  timestamps: false,
})
class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare price: number;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare order_id: string;

  @BelongsTo(() => OrderModel, {
    onDelete: "CASCADE",
  })
  declare order: OrderModel;
}

export { OrderItemModel };
