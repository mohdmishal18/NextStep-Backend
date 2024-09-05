export enum ErrorCode {
    // General errors
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR', // Server encountered an unexpected condition

    // Authentication errors
    UNAUTHORIZED = 'UNAUTHORIZED', // User is not authorized to access the resource
    FORBIDDEN = 'FORBIDDEN', // User does not have permission to perform the action
    USER_NOT_FOUND = 'USER_NOT_FOUND', // User does not exist
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS', // Incorrect username/password
    USER_NOT_VERIFIED = 'USER_NOT_VERIFIED',
    INVALID_ADMIN_EMAIL = 'INVALID_ADMIN_EMAIL',

    // Validation errors
    VALIDATION_ERROR = 'VALIDATION_ERROR', // Request data validation failed
    MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD', // Required field is missing in request data
    INVALID_FIELD_VALUE = 'INVALID_FIELD_VALUE', // Field value is invalid or doesn't meet requirements
    INCORRECT_PASSWORD = 'INCORRECT_PASSWORD', // Field with Incorrect Password 

    // Data access errors
    RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND', // Requested resource not found
    DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE', // Attempt to create duplicate resource
    FAILED_SENDING_OTP = 'FAILED_SENDING_OTP',
    FAILED_UPDATING = 'FAILED_UPDATING',

    // Business logic errors
    EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
    USERNAME_ALREADY_EXISTS = 'USERNAME_ALREADY_EXISTS',
    INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS', // User has insufficient funds to perform action
    ORDER_NOT_FOUND = 'ORDER_NOT_FOUND', // Order does not exist
    INVALID_OPERATION = 'INVALID_OPERATION', // Operation is not allowed or invalid
    USER_ALREADY_JOINED = 'USER_ALREADY_JOINED',
    TRIP_IS_FULL = 'TRIP_IS_FULL',
    CONVERSATION_DOESNOT_EXIST = 'CONVERSATION_DOESNOT_EXIST',

    // Custom application-specific errors
    INVALID_SKILL_ID = 'INVALID_SKILL_ID',
}
