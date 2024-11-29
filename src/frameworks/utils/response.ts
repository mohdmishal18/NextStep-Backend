export const successResponse = <T>(data: T, message: string) => ({
    success: true,
    data,
    message,
    error: null,
});
