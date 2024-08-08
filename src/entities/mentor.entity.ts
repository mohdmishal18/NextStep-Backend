export interface IMentor {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    isBlocked: boolean;
    education: string;
    bio: string
    otpVerified: boolean;
    profilePicture?:string;
    coverPicture?: string;
    linkedinUrl: string;
    presentCompany: string;
    presentRole: string;
    country: string;
    place: string;
    __v: number;
}


export interface IRegisterMentor {
    name: string;
    email: string;
    password: string;
    phone: string;
    education: string;
    bio: string
    otpVerified: boolean;
    profilePicture?:string;
    coverPicture?: string;
    linkedinUrl: string;
    presentCompany: string;
    presentRole: string;
    country: string;
    place: string;
}
