import {ErrorRequestHandler} from 'express';

import{ValidationError} from 'yup'

interface ValidationsError{
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) =>{
    if( error instanceof ValidationError){
        let errors: ValidationsError = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });
        return response.status(400).json({mensagem: 'Validation erros', errors})
    }
    console.log(error);
    return response.status(500).json({message: 'Internal server error'})
}

export default errorHandler