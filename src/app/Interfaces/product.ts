import { Brand } from "./brand";

export interface Product {
  sold:                number;
    images:              string[];
    subcategory:         Brand[];
    ratingsQuantity:     number;
    _id:                 string;
    title:               string;
    slug:                string;
    description:         string;
    quantity:            number;
    price:               number;
    imageCover:          string;
    category:            Brand;
    brand:               Brand;
    ratingsAverage:      number;
    createdAt:           Date;
    updatedAt:           Date;
    id:                  string;
    priceAfterDiscount?: number;
    availableColors?:    any[];
}
