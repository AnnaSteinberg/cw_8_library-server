

/*
PATCH/accounts/password => Roles.USER
GET/accounts/reader => ROLES.USER, ROLES.ADMIN
 */

import {AuthRequest, Roles} from "../utils/libTypes.js";
import {Response, NextFunction} from "express";
import {HttpError} from "../errorHandler/HttpError.js";

export const authorization = (pathRoute:Record<string,Roles[]>)=>
    (req:AuthRequest, res:Response, next:NextFunction) => {
    const route = req.method + req.path;
    const roles = req.roles
    if(!roles || roles.some(r => pathRoute[route].includes(r)))
        next();
    else throw new HttpError(403, "");
    }

    export const checkAccountById = (checkPathId: string[]) => {
        return(req:AuthRequest, res:Response, next:NextFunction) => {
            const route = req.method + req.path;
            const roles = req.roles;
            if(!roles || !checkPathId.includes(route) || (!req.roles!.includes(Roles. ADMIN)
                && req.roles!.includes(Roles.USER)
                && req.userId == req.query.id))
                next()
            else throw new HttpError(403, "You cdn modify only your own account");
        }
    }

