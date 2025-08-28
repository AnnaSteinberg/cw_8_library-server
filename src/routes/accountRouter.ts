import * as controller from '../controllers/accountController.js'
import express, {Response} from "express";
import {bodyValidation} from "../validation/bodyValidation.js";
import {
    ChangePasswordDtoSchema,
    ChangeRolesSchema,
    ReaderDtoSchema,
    UpdateAccountSchema
} from "../validation/joiSchemas.js";

export const accountRouter = express.Router();

accountRouter.post('/', bodyValidation(ReaderDtoSchema), controller.addAccount);
accountRouter.get('/reader', controller.getAccountById);
accountRouter.patch('/password', bodyValidation(ChangePasswordDtoSchema), controller.changePassword);
accountRouter.delete('/',controller.removeAccount);
accountRouter.patch('/', bodyValidation(UpdateAccountSchema), controller.updateAccount)
accountRouter.put('/roles',bodyValidation(ChangeRolesSchema),controller.changeRoles)