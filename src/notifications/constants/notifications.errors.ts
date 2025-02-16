import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const NOTIFICATIONS_ERRORS = {
  MAIL_HOST: new BadRequestException({
    id: 'NTS-001',
    message: 'O host do servidor de e-mails não está configurado.',
  }),
  TRANSPORTER: new InternalServerErrorException({
    id: 'NTS-002',
    message: 'Falha ao inicializar o serviço de e-mails.',
  }),
  EMAIL_SEND_FAILED: new InternalServerErrorException({
    id: 'NTS-003',
    message: 'Falha ao enviar o e-mail.',
  }),
  NOT_FOUND_TEMPLATE: new BadRequestException({
    id: 'NTS-004',
    message: 'Template de e-mail não encontrado.',
  }),
};
