import { Sequelize } from "sequelize-typescript";
import { join } from "path"

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: join(__dirname, '../../../../database.sqlite'),
    logging: true
  })
  