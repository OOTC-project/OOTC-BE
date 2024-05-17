import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { RequestResetPasswordDto } from '../dtos/request_reset_password.dto'; // 실제 DTO 경로로 수정 필요

@ValidatorConstraint({ async: false })
class IsPasswordsMatchConstraint implements ValidatorConstraintInterface {
    validate(passwordConfirm: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const password = (args.object as RequestResetPasswordDto)[relatedPropertyName]; // 타입을 RequestResetPasswordDto로 변경
        return password === passwordConfirm;
    }

    defaultMessage() {
        return 'Password and passwordConfirm do not match';
    }
}

export function IsPasswordsMatch(property: string, validationOptions?: ValidationOptions) {
    return function (target: RequestResetPasswordDto, propertyName: string) {
        registerDecorator({
            target: target.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsPasswordsMatchConstraint,
        });
    };
}
