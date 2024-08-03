export function generateOtpHtml(otp: string): string {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #333;">Your OTP Code</h2>
            <p>Use the following OTP code to complete your login:</p>
            <div style="font-size: 24px; font-weight: bold; margin: 20px 0;">
                ${otp}
            </div>
            <p>If you did not request this code, please ignore this email.</p>
        </div>
    `;
}
