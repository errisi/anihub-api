interface ErrorOptions {
  message: string;
  status: number;
  errors: object;
}

export class ApiError extends Error {
  status: number;
  errors: object;

  constructor({ message, status, errors = {} }: ErrorOptions) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static badRequest(message: string, errors: object): ApiError {
    return new ApiError({
      message,
      errors,
      status: 400,
    });
  }

  static alreadyExist(message: string, errors: object): ApiError {
    return new ApiError({
      message,
      errors,
      status: 409,
    });
  }

  static unauthorized(errors: object): ApiError {
    return new ApiError({
      message: 'unauthorized user',
      errors,
      status: 401,
    });
  }

  static notFound(errors: object): ApiError {
    return new ApiError({
      message: 'not found',
      errors,
      status: 404,
    });
  }
}
