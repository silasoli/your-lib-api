import { InternalServerErrorException } from '@nestjs/common';

export const SERVER_ERRORS = {
  NOT_FOUND_PORT: new InternalServerErrorException({
    id: 'SRV-001',
    message: 'Application port wasnt found',
  }),
};
