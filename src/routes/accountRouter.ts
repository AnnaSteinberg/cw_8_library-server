import * as controller from '../controllers/accountController.js'
import express, {Response} from "express";
import {bodyValidation} from "../validation/bodyValidation.js";
import {ChangePasswordDtoSchema, ReaderDtoSchema} from "../validation/joiSchemas.js";
import {AuthRequest, Roles} from "../utils/libTypes.js";
import {HttpError} from "../errorHandler/HttpError.js";

export const accountRouter = express.Router();

accountRouter.post('/', bodyValidation(ReaderDtoSchema), controller.addAccount);
accountRouter.get('/reader',async (req: AuthRequest, res: Response) => {
    if(req.roles?.includes(Roles.USER))
        await controller.getAccountById(req, res)
    throw new HttpError(403,"")
});
accountRouter.patch('/password', bodyValidation(ChangePasswordDtoSchema), controller.changePassword);
accountRouter.delete('/',controller.removeAccount);