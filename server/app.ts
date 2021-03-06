import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import DataBase from './config/db';

class app {
    public app: express.Application;
    private morgan: morgan.Morgan;
    private bodyParser;
    private dataBase: DataBase;

    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
        this.dataBase = new DataBase();
        this.DataBaseConnection();
    }

    DataBaseConnection() {
        this.dataBase.createConnection();
    }

    closeDataBaseConnection(message, callback) {
        this.dataBase.closeConnection(message, () => callback());
    }

    middleware() {
        this.app.use(morgan("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

    }
    routes() {
        this.app.route("/").get((req, res) =>
            res.status(200).json({ message: "hello, world" }));
        this.app.route("/teste").get((req, res) =>
            res.status(200).json({ message: "rota teste está funcionando" }));

    }
}

export default new app();