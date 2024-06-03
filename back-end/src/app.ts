import "express-async-errors";
import express from "express";
import errorMiddleware from "./middleware/error/error";
import addressRouter from "./routers/AddressRouter";
import db from "./database/Address.db";

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get("/", (req, res) => res.json({ ok: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,DELETE,OPTIONS,PUT,PATCH"
      );
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    // this.app.use('/login', loginRouter);
    this.app.use("/address", addressRouter);

    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));

    process.on('SIGINT', () => {
        db.close((err) => {
          if (err) {
            console.error(err.message);
          }
          console.log('Closing SQLite database connection.');
          process.exit();
        });
      });
  }
}

export { App };
