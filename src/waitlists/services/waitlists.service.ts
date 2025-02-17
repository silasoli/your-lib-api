import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { CreateWaitlistDto } from '../dto/create-waitlist.dto';
import { UpdateWaitlistDto } from '../dto/update-waitlist.dto';
import { WaitlistResponseDto } from '../dto/waitlist-response.dto';
import { Books, BooksDocument } from '../../books/schemas/book.entity';
import { Waitlists, WaitlistsDocument } from '../schemas/waitlist.entity';
import { WAITLIST_ERRORS } from '../constants/genres.errors';
import { NotificationsService } from '../../notifications/services/notifications.service';

@Injectable()
export class WaitlistsService {
  constructor(
    @InjectModel(Waitlists.name)
    private readonly waitlistModel: Model<WaitlistsDocument>,
    @InjectModel(Books.name)
    private readonly booksModel: Model<BooksDocument>,
    private readonly notificationsService: NotificationsService,
  ) {}

  private async getNextPosition(bookId: string): Promise<number> {
    return (await this.waitlistModel.countDocuments({ bookId })) + 1;
  }

  private async validateBookOwnership(bookId: string, userId: string) {
    const book = await this.booksModel.findById(bookId);
    if (!book) throw WAITLIST_ERRORS.BOOK_NOT_FOUND;
    if (book.userId === userId) throw WAITLIST_ERRORS.BOOK_OWNED_BY_USER;
  }

  public async create(
    userId: string,
    dto: CreateWaitlistDto,
  ): Promise<WaitlistResponseDto> {
    await this.validateBookOwnership(dto.bookId, userId);
    const count = await this.waitlistModel.countDocuments({
      bookId: dto.bookId,
    });
    if (count >= 5) throw WAITLIST_ERRORS.MAX_WAITLIST_REACHED;

    const position = await this.getNextPosition(dto.bookId);
    const created = await this.waitlistModel.create({
      ...dto,
      position,
      userId,
    });

    await this.notificationsService.sendEmailWithTemplate(
      {
        emailAddress: dto.borrowerEmail,
        title: 'Confirmação de Entrada na Fila',
      },
      { userName: dto.borrowerName, bookTitle: dto.bookId, position },
      'waitlist-confirmation',
    );

    return new WaitlistResponseDto(created);
  }

  public async findAll(
    userId: string,
    bookId: string,
  ): Promise<WaitlistResponseDto[]> {
    const waitlist = await this.waitlistModel
      .find({ bookId, userId })
      .sort('position');
    return waitlist.map((entry) => new WaitlistResponseDto(entry));
  }

  public async update(
    _id: string,
    userId: string,
    dto: UpdateWaitlistDto,
  ): Promise<WaitlistResponseDto> {
    await this.waitlistModel.updateOne({ _id, userId }, dto);
    const updated = await this.waitlistModel.findOne({ _id, userId });
    if (!updated) throw WAITLIST_ERRORS.NOT_FOUND;

    await this.notificationsService.sendEmailWithTemplate(
      {
        emailAddress: updated.borrowerEmail,
        title: 'Atualização na Fila de Espera',
      },
      { userName: updated.borrowerName, bookTitle: updated.bookId },
      'waitlist-update',
    );

    return new WaitlistResponseDto(updated);
  }

  public async remove(_id: string, userId: string): Promise<void> {
    const session: ClientSession = await this.waitlistModel.startSession();
    session.startTransaction();
    //enviar email em massa para usuarios com sua nova posicao

    try {
      const removedEntry = await this.waitlistModel.findOneAndDelete(
        { _id, userId },
        { session },
      );
      if (!removedEntry) throw WAITLIST_ERRORS.NOT_FOUND;

      await this.recalculatePositions(removedEntry.bookId, session);
      await session.commitTransaction();

      await this.notificationsService.sendEmailWithTemplate(
        {
          emailAddress: removedEntry.borrowerEmail,
          title: 'Remoção da Fila de Espera',
        },
        { userName: removedEntry.borrowerName, bookTitle: removedEntry.bookId },
        'waitlist-removed',
      );
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  private async recalculatePositions(
    bookId: string,
    session: ClientSession,
  ): Promise<void> {
    const waitlist = await this.waitlistModel
      .find({ bookId })
      .sort('addedAt')
      .session(session);
    const updates = waitlist.map((entry, index) => ({
      updateOne: {
        filter: { _id: entry._id },
        update: { $set: { position: index + 1 } },
      },
    }));
    if (updates.length > 0) {
      await this.waitlistModel.bulkWrite(updates, { session });
    }
  }
}
