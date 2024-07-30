import crypto from "crypto"

class OTPGenerator {
    async generateOtp(length: number): Promise<string> {
        
        const hexLength = Math.ceil(length / 2);
        const otp = crypto.randomBytes(hexLength).toString('hex').slice(0, length);
        return otp

    }
}

export default OTPGenerator;