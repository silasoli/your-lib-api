import { Test, TestingModule } from '@nestjs/testing';
import { WaitlistsService } from '../services/waitlists.service';
import { WaitlistsController } from './waitlists.controller';

describe('WaitlistsController', () => {
  let controller: WaitlistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaitlistsController],
      providers: [WaitlistsService],
    }).compile();

    controller = module.get<WaitlistsController>(WaitlistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
