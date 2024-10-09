import { migrator } from "../config/migration-cli";
import { sequelize } from "../config/sequelize";

migrator(sequelize).runAsCLI()