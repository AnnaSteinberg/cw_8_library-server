import express from "express";
import {libRouter} from "./routes/libRouter.ts";
import {errorHandler} from "./errorHandler/errorHandler.ts";
import morgan from "morgan";
import * as fs from "node:fs";
import dotenv from "dotenv";
import {accountRouter} from "./routes/accountRouter.js";
import {accountServiceMongo} from "./services/AccountServiceEmplMongo.js";
import {authentication, skipRoutes} from "./middleware/authentication.js";
import {CHECK_ID_ROUTES, PATH_ROUTES, SKIP_ROUTES} from "./config/libConfig.js";
import {authorization, checkAccountById} from "./middleware/authorization.js";


export  const launchServer = () => {
    //===load environments=======
    dotenv.config();
    // console.log(process.env);
    const app = express();
    const PORT = process.env.PORT

    app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));

    const logStream = fs.createWriteStream("./src/logs/access.log", { flags: "a" });

//============Middleware===========
    app.use(authentication(accountServiceMongo));
    app.use(skipRoutes(SKIP_ROUTES));
    app.use(authorization(PATH_ROUTES))
    app.use(express.json());
    app.use(checkAccountById(CHECK_ID_ROUTES))
    app.use(morgan("dev"));
    app.use(morgan('combined', {stream: logStream}));

//============Router===========

    app.use('/api', libRouter);
    app.use('/accounts', accountRouter)

    app.use((req: express.Request, res: express.Response) => {
        res.status(404).send('!Page Not Found!');
    })
//==================ErrorHandler===============
    app.use(errorHandler)

}


