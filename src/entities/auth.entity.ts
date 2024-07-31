interface IAuth {
    _id: string
    name: string;
    email: string;
    password: string;
    phone: string
    token?: string[];
    otpVerified: boolean;
    userid: string
}
  
export default IAuth;