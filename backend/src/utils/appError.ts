import { HttpStatus } from "../types/httpStatus"

declare global {
    interface ErrorConstructor {
        captureStackTrace(targetObject: any, constructorOpt?: Function): void
    }
}

class AppError extends Error {
    statusCode: number
    status: string
    isOperational: boolean

    constructor(message: string, statusCode: HttpStatus) {
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message || "Unauthorized access", 401)
    }
}

class NotFoundError extends AppError {
    constructor(message: string) {
        super(message || "Resource not found", 404)
    }
}

class ValidationError extends AppError {
    constructor(message: string) {
        super(message || "Validation failed", 400)
    }
}

class InternalServerError extends AppError {
    constructor(message: string) {
        super(message || "Internal server error", 500)
    }
}

export {
    AppError,
    UnauthorizedError,
    NotFoundError,
    ValidationError,
    InternalServerError
}
