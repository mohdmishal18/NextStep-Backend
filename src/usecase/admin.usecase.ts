import IAdminRepository from "../interfaces/repositories/IAdmin.repository";
import IAdminUsecase, {loginRes} from "../interfaces/usecase/IAdmin.usecase";
import IhashingService from "../interfaces/utils/hashingService";
import IjwtService from "../interfaces/utils/jwtService";

export default class AdminUsecase implements IAdminUsecase {
    
    private adminRepository: IAdminRepository;
    private hashingService: IhashingService;
    private jwtService: IjwtService;

    constructor(
        adminRepository: IAdminRepository,
        hashingService: IhashingService,
        jwtService: IjwtService
    ) {
        this.adminRepository = adminRepository
        this.hashingService = hashingService
        this.jwtService = jwtService
    }

    async login(email: string, password: string): Promise<loginRes | void> {

        try {

            const admin = await this.adminRepository.checkEmailExists(email)

            if(!admin) {
                return { message: "Incorrect Password" }
            }

            const checkPassword = await this.hashingService.compare(
                password,
                admin.password
            )

            if(!checkPassword) {
                return { message: "Incorrect Password" }
            }

            let payload = {
                userId: admin._id,
                name: admin.name,
                role: 'admin'
            }

            let adminAccessToken = this.jwtService.generateToken(payload);
            let adminRefreshToken = this.jwtService.generateRefreshToken(payload);

            return {message : "Login Successfull", adminAccessToken, adminRefreshToken}

        } catch (error) {
            console.log(error)
        }

    }
}