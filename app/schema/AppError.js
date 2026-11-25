export class AppError extends Error {
    constructor(msg, status, details) {
        super(msg)
        this.reason = msg;
        this.status = status;
        this.details = details;
    };
};