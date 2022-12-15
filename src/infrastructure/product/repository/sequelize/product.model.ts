import { Model, Table, PrimaryKey, Column } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: false,
})
class ProductModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}

export { ProductModel };
