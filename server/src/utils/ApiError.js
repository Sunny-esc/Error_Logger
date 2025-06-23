import e from "express";
import { Error } from "mongoose";

class ApiError extends Error {
  constructor(statusCode, message='something went wrong',error,stack) {
    super(message);
    this.data=null;
    this.error = error;
    this.success = false;

    this.statusCode = statusCode;
    this.message = message;
if (stack) {
      this.stack = stack;
    }else {
        Error.captureStackTrace(this, this.constructor);
        
    }
}

}
export default ApiError;