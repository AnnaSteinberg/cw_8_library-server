
import Joi from 'joi'

export const BookDtoSchema = Joi.object({
    title: Joi.string().alphanum().min(2).required(),
    author: Joi.string().alphanum().min(1).required(),
    genre: Joi.string().required(),
    quantity:Joi.number().min(1).max(10)
})