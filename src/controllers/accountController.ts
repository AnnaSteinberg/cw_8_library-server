import {Request, Response} from "express";
import {Reader, ReaderDto} from "../model/Reader.js";
import {checkReaderId, convertReaderDtoToReader} from "../utils/tools.js";
import {accountServiceMongo} from "../services/AccountServiceEmplMongo.js";
import {HttpError} from "../errorHandler/HttpError.js";

export let removeAccount = (req:Request, res:Response) => {
        res.send("ok")
    }
;


export let changePassword = (req:Request, res:Response) => {
        res.send("ok")
    }
;


export let getAccountById = async (req: Request, res: Response) => {
    const {id} = req.query;
    const _id = checkReaderId(id as string);
    const account = await accountServiceMongo.getAccount(_id);
    res.json(account);
}


export const addAccount = async (req: Request, res: Response) => {
    const body = req.body;
    const reader: Reader = convertReaderDtoToReader(body as ReaderDto)
    await accountServiceMongo.addAccount(reader)
    res.status(201).send()
}

