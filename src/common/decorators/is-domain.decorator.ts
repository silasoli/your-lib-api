import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsDomainConstraint implements ValidatorConstraintInterface {
  validate(domain: string) {
    const domainRegex = /^(?!www\.)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.com$/;

    return domainRegex.test(domain);
  }

  defaultMessage() {
    return 'The $property field must be a valid domain';
  }
}

export function IsDomain(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDomainConstraint,
    });
  };
}
