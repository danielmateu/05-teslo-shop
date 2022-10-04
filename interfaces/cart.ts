import { ISize} from "./";

export interface ICartProduct {
    _id: string;
    images: string;
    inStock: number;
    price: number;
    sizes: ISize;
    slug: string;
    title: string;
    gender: 'men' | 'women' | 'kid' | 'unisex'
    quantity : number;
    
}