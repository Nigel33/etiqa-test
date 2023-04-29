export class CreateUserDto {
  username: string;
  email: string;
  phoneNumber?: string;
  skillsets?: string[];
  hobby?: string;
}