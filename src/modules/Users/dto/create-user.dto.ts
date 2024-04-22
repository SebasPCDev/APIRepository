import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
  //Validate,
} from 'class-validator';

//import { MatchPassword } from 'src/modules/decorators/matchPassword.decorator';

export class CreateUserDto {
  /**
   * El nombre debe tener entre 3 y 80 caracteres.
   * @example 'John Doe'
   */
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;
  /**
   * El email debe ser un email válido.
   * @example 'example@mail.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * El password debe tener al menos 8 caracteres, 1 letra minúscula, 1 letra mayúscula, 1 número y 1 símbolo.
   * @example 'StrongPassword123!'
   */
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  /**
   * El password de confirmación debe ser igual al password.
   * @example 'StrongPassword123!'
   */
  @IsNotEmpty()
  @IsString()
  //Validate(MatchPassword, ['password'])
  confirmpassword: string;

  /**
   * La dirección debe tener entre 3 y 80 caracteres.
   * @example 'Calle 123'
   */
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  address: string;

  /**
   * El teléfono debe ser un número.
   * @example 1234567890
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * El país debe tener entre 5 y 20 caracteres.
   * @example 'Colombia'
   */
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  country: string;

  /**
   * La ciudad debe tener entre 5 y 20 caracteres.
   * @example 'Ibague'
   */
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  city: string;

  /**
   * El campo admin debe ir vacío, por defecto es false.
   * @example false
   */
  @ApiHideProperty()
  @IsEmpty()
  admin: boolean;
}

export class LoginUserDto {
  /**
   * El email debe ser un email válido.
   * @example 'sebpa.16@gmail.com'
   */
  @IsNotEmpty()
  email: string;
  /**
   * El password debe tener al menos 8 caracteres, 1 letra minúscula, 1 letra mayúscula, 1 número y 1 símbolo.
   * @example 'Sebas123!'
   */
  @IsNotEmpty()
  password: string;
}
