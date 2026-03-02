import { Test, TestingModule } from '@nestjs/testing';
import { OfferGalleryController } from './offer-gallery.controller';

describe('OfferGalleryController', () => {
  let controller: OfferGalleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferGalleryController],
    }).compile();

    controller = module.get<OfferGalleryController>(OfferGalleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
