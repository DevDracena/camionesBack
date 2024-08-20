import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource: DataSourceOptions = {
    type: "mariadb",
    host: "127.0.0.1",
    port: 3310,
    username: "root",
    password: "12345",
    database: "typeorm",
    entities: [],
    logging:true,
    synchronize:true,
}

