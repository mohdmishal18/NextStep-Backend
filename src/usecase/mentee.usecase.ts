import bcrypt from 'bcrypt'

import { IMenteeRepository } from "../interfaces/repositories/IMentee.repository";
import IMentee from "../entities/mentee.entity";
import { IMenteeUseCase } from "../interfaces/usecase/IMentee.usercase";

import { ErrorCode } from "../enums/errorCodes";

export class MenteeUseCase implements IMenteeUseCase {
    
    private menteeRepository: IMenteeRepository;

    constructor(menteeRepository: IMenteeRepository) {
        
        this.menteeRepository = menteeRepository;
    }

    async signup(data: IMentee): Promise<IMentee> {
        
        try {

            const emailExists = await this.menteeRepository.checkEmailExists(data.email);

            const usernameExists = await this.menteeRepository.checkUsernameExists(
                data.name
            );

            if (emailExists) {
                throw new Error(ErrorCode.EMAIL_ALREADY_EXISTS); // Throw for controller handling
            }

            if (usernameExists) {
                throw new Error(ErrorCode.USERNAME_ALREADY_EXISTS); // Throw for controller handling
            }

            //Hash password
            data.password = await bcrypt.hash(data.password as string, 10);

            //create new user.
            const newUser = await this.menteeRepository.save(data)
            return newUser

        } catch (error) {
            throw error
        }
    }
}