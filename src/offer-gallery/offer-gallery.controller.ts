import { Controller, Get } from '@nestjs/common';
import { OfferGalleryService } from './offer-gallery.service';

@Controller('offer-gallery')
export class OfferGalleryController {
  constructor(private readonly offerGalleryService: OfferGalleryService) {}

  @Get()
  findAll() {
    return this.offerGalleryService.findAll();
  }
}
