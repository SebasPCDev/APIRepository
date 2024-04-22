import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'matchPassword', async: false })
export class MatchPassword implements ValidatorConstraintInterface {
  validate(password: any, args: ValidationArguments) {
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return `Password do not match`;
  }
}

// Esto es un decorador personalizado el cual por medio del @Validate(MatchPassword) se encarga de validar que el password y el confirmpassword sean iguales
// Donde se ubique el decorador, todas las rutas que utilicen el DTO en cuestión, lo va a validar.

//Lo cree en la carpeta decorators, pero puede ser en cualquier otra carpeta, solo se debe tener en cuenta la ruta para importarlo
// Es solo a modo de ejemplo. Yo seguiré utilizando el Pipe para validar los passwords
