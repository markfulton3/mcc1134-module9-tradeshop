import { toBase64String } from '@angular/compiler/src/output/source_map';

export class Post {
    key: string;
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    location: string;
    user: string;
    price: number;
    editable: false;

    constructor(key, title, category, description, imageUrl, location, price, user)
    {
        this.key = key;
        this.title = title;
        this.category = category;
        this.description = description;
        this.imageUrl = imageUrl;
        this.location = location;
        this.price = price;
        this.user = user;
    }
}