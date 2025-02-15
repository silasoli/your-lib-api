import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsDomainConstraint implements ValidatorConstraintInterface {
  validate(domain: string, args: ValidationArguments) {
    const domainRegex = /^(?!www\.)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.com$/;

    return domainRegex.test(domain);
  }

  defaultMessage(args: ValidationArguments) {
    return 'The $property field must be a valid domain';
  }
}

export function IsDomain(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDomainConstraint,
    });
  };
}
