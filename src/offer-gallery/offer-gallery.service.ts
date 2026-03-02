import { Injectable } from '@nestjs/common';

@Injectable()
export class OfferGalleryService {
  private offersData = [
    {
      id: 1,
      image: {
        src: 'https://burgerlivery-esposito-api.onrender.com/uploads/depositphotos_15951851-stock-photo-fresh-pizza.webp',
        alt: 'Duas pizzas em cima de uma mesa',
      },
      title: 'Pizza em dobro',
      description: 'Compre uma pizza e ganhe outra',
    },
    {
      id: 2,
      image: {
        src: 'https://burgerlivery-esposito-api.onrender.com/uploads/pizza_coca_cola.png',
        alt: 'Pizza de Calabresa com uma garrafa de Coca-Cola',
      },
      title: 'Pizza de Calabresa + Coca',
      description: 'Pizza + Coca-Cola as Quintas',
    },
    {
      id: 3,
      image: {
        src: 'https://burgerlivery-esposito-api.onrender.com/uploads/pizza_sobremesa.png',
        alt: 'Pizza + Sobremesa em cima de uma mesa',
      },
      title: 'Quarta: Pizza + Sobremesa',
      description: 'As quartas compre uma pizza e leve a sobremesa de graça',
    },
  ];

  findAll() {
    return this.offersData;
  }
}
