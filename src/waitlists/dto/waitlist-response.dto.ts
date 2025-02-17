import { ApiProperty } from '@nestjs/swagger';
import { Waitlists } from '../schemas/waitlist.entity';

export class WaitlistResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  bookId: string;

  @ApiProperty()
  borrowerName: string;

  @ApiProperty()
  borrowerEmail: string;

  @ApiProperty()
  addedAt: Date;

  @ApiProperty()
  position: number;

  constructor(data: Waitlists) {
    this._id = String(data._id);
    this.bookId = String(data.bookId);
    this.borrowerName = data.borrowerName;
    this.borrowerEmail = data.borrowerEmail;
    this.addedAt = data.addedAt;
    this.position = data.position;
  }
}
