export interface UpdateProfileDto {
    email: string;
    password: string;
    person: {
        fullName?: string;
        birthDate?: Date;
        cellphone?: string;
    }
}