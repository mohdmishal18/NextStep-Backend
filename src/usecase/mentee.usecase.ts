import { IMenteeRepository } from "../interfaces/repositories/IMentee.repository";
import IMentee from "../entities/mentee.entity";
import { IMenteeUseCase } from "../interfaces/usecase/IMentee.usercase";

export class MenteeUseCase implements IMenteeUseCase {
    
    private menteeRepository: IMenteeRepository;

    constructor(menteeRepository: IMenteeRepository) {
        
        this.menteeRepository = menteeRepository;
    }

    async signup(data: IMentee): Promise<IMentee> {
         
        const existingEmail = await this.menteeRepository.findByEmail(data.email)
        if(existingEmail) {
            throw new Error('User already exists')
        }

        
    }
}