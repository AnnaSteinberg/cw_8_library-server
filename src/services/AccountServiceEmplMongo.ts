import {AccountService} from "./accountService.js";
import {Reader} from "../model/Reader.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {Roles} from "../utils/libTypes.js";

export class AccountServiceEmplMongo implements AccountService{
    async addAccount(reader: Reader): Promise<void> {
        const temp = await ReaderModel.findById(reader._id)
        if (temp) throw new HttpError(409, 'Reader already exists');
        const readerDoc = new ReaderModel(reader);
        await readerDoc.save()
    }

    changePassword(id: number, newPassword: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    async getAccount(id: number): Promise<Reader> {
        const result = await ReaderModel.findById(id);
        if (!result) throw new HttpError(404, "Account not found");
        return result as unknown as Reader;
    }

    removeAccount(id: number): Promise<Reader> {
        // return Promise.resolve(undefined);
        throw 'No realise'

    }

    async updateAccount(updReader: Reader): Promise<Reader> {
        const result =
            await ReaderModel.findByIdAndUpdate(updReader._id, {userName: updReader.userName, email: updReader.email, birthdate: updReader.birthdate},{new:true})
        if(!result) throw new HttpError(404, "Account not found");
        return result as unknown as Reader;
    }

    async changeRoles(id: number, newRoles: Roles[]): Promise<Reader> {
        const result =
            await ReaderModel.findByIdAndUpdate(id, {roles : newRoles},{new:true})
        if(!result) throw new HttpError(404, "Account not found");
        return result as unknown as Reader;
    }

}



export const accountServiceMongo = new AccountServiceEmplMongo();