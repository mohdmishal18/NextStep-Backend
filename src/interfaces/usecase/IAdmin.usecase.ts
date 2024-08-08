

export interface loginRes {
    message:string,
    adminAccessToken? : string
    adminRefreshToken?:string
}

export default interface IAdminUsecase {
    login(email: string, password: string): Promise<loginRes | void>
}