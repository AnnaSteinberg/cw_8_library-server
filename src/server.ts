import express from "express";
import {libRouter} from "./routes/libRouter.ts";
import {errorHandler} from "./errorHandler/errorHandler.ts";
import morgan from "morgan";
import * as fs from "node:fs";
import dotenv from "dotenv";


export  const launchServer = () => {
    //===load environments=======
    dotenv.config();
    // console.log(process.env);
    const app = express();
    const PORT = process.env.PORT

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


