import { Category } from "./category";

export interface Brand {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: Category;
}
