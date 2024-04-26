import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  /**
   * El nombre debe tener entre 3 y 80 caracteres.
   * @example 'John Doe'
   */
  @IsOptional()
  @IsString()
  @Length(3, 80)
  name: string;

  /**
   * El email debe ser un email válido.
   * @example 'example@mail.com'
   */
  @IsOptional()
  @IsEmail()
  email: string;

  /**
   * El password debe tener al menos 8 caracteres, 1 letra minúscula, 1 letra mayúscula, 1 número y 1 símbolo.
   * @example 'StrongPassword123!'
   */
  @IsOptional()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  /**
   * La dirección debe tener entre 3 y 80 caracteres.
   * @example 'Calle 123'
   */
  @IsOptional()
  @IsString()
  @Length(3, 80)
  address: string;

  /**
   * El teléfono debe ser un número.
   * @example 1234567890
   */
  @IsOptional()
  @IsNumber()
  phone: number;

  /**
   * El país debe tener entre 5 y 20 caracteres.
   * @example 'Colombia'
   */
  @IsOptional()
  @IsString()
  @Length(5, 20)
  country: string;

  /**
   * La ciudad debe tener entre 5 y 20 caracteres.
   * @example 'Medellín'
   */
  @IsOptional()
  @IsString()
  @Length(5, 20)
  city: string;

  /**
   * El rol debe ser un booleano.
   */
  @IsEmpty()
  role: string;
}

export class UpdateUserAdminDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(['user', 'admin'], { message: 'Role must be user or admin' })
  role: string;
}
