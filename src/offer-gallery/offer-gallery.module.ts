import { Module } from '@nestjs/common';
import { OfferGalleryController } from './offer-gallery.controller';
import { OfferGalleryService } from './offer-gallery.service';

@Module({
  controllers: [OfferGalleryController],
  providers: [OfferGalleryService],
})
export class OfferGalleryModule {}
