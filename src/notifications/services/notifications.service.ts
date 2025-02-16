/* eslint-disable*/
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';
import { NOTIFICATIONS_ERRORS } from '../constants/notifications.errors';
import { SendNotificationDto } from '../dto/send-notification.dto';
import { SendNotificationTemplateDto } from '../dto/send-notification-template.dto';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly config: ConfigService) {
    const mailHost = config.get<string>('MAIL_HOST');
    if (!mailHost) throw NOTIFICATIONS_ERRORS.MAIL_HOST;

    this.transporter = nodemailer.createTransport({
      host: config.get<string>('MAIL_HOST'),
      port: 587,
      secure: false,
      auth: {
        user: config.get<string>('MAIL_USER'),
        pass: config.get<string>('MAIL_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  public sendEmail(
    dto: SendNotificationDto,
  ): Promise<SMTPTransport.SentMessageInfo> {
    if (!this.transporter) throw NOTIFICATIONS_ERRORS.TRANSPORTER;

    return this.transporter.sendMail({
      to: dto.emailAddress,
      from: this.config.get<string>('MAIL_FROM'),
      subject: dto.title,
      html: dto.message,
      attachments: dto.attachments || [],
    });
  }

  public async sendEmailWithTemplate(
    dto: SendNotificationTemplateDto,
    context: object,
    template: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const filename = path.join(
      process.cwd(),
      'src/notifications/templates',
      `${template}.ejs`,
    );

    if (!fs.existsSync(filename)) throw NOTIFICATIONS_ERRORS.NOT_FOUND_TEMPLATE;

    const templateString = fs.readFileSync(filename, { encoding: 'utf-8' });
    const body = ejs.render(templateString, { context });

    return this.sendEmail({
      emailAddress: dto.emailAddress,
      title: dto.title,
      message: body,
      attachments: dto.attachments || [],
    });
  }
}
