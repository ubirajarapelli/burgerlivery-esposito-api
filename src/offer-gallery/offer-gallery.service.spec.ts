import { Test, TestingModule } from '@nestjs/testing';
import { OfferGalleryService } from './offer-gallery.service';

describe('OfferGalleryService', () => {
  let service: OfferGalleryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferGalleryService],
    }).compile();

    service = module.get<OfferGalleryService>(OfferGalleryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
