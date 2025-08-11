import express from "express";
import {PORT} from "./config/libConfig.ts";
import {libRouter} from "./routes/libRouter.ts";
import {errorHandler} from "./errorHandler/errorHandler.ts";
import morgan from "morgan";
import * as fs from "node:fs";

export  const launchServer = () => {
    const app = express();

    app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));

    const logStream = fs.createWriteStream("./src/logs/access.log", { flags: "a" });

//============Middleware===========

    app.use(express.json());
    app.use(morgan("dev"));
    app.use(morgan('combined', {stream: logStream}));

//============Router===========

    app.use('/api', libRouter);


    app.use((req: express.Request, res: express.Response) => {
        res.status(404).send('Page Not Found');
    })
//==================ErrorHandler===============
    app.use(errorHandler)

}


