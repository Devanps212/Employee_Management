export interface ErrorResponse {
    status: string;
    message: string;
}
  
export interface NotFoundErrorResponse extends ErrorResponse {
    errorMessage: string;
}