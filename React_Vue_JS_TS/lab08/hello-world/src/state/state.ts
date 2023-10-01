import { ProductEl } from "../components/product.tsx";

import banan from "../photos/banan.jpg"
import ananas from "../photos/ananas.jpg";
import apple from "../photos/apple.jpg";
import vishnya from "../photos/vishnya.jpg";
import grusha from "../photos/grusha.jpg";

export const Products : ProductEl[] = [
    {image: banan, name:"Банан", price:"5 рублей"},
    {image: ananas, name:"Ананас", price:"10 золотых"},
    {image: apple, name:"Яблоко", price:"3 копейки"},
    {image: vishnya, name:"Вишня", price:"22 доллара"},
    {image: grusha, name:"Груша", price:"12 евро"}
]
