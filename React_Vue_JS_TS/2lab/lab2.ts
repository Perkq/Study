interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

class Shop implements Iterator<Footwear>
{
    name: string;
    pointer: number = 0
    products:Set<Footwear>;
    constructor(_name:string, _products:Set<Footwear>){
        this.name =_name
        this.products = _products
    }

    public next(): IteratorResult<Footwear> {
        if (this.pointer < this.products.size) {
            return {
                done: false,    
                value: [...this.products][this.pointer++],
            };
        } else {
            return {
                done: true,
                value: null,
            };
        }
    }


    PriceFilter(lowPrice:number,topPrice:number){
        this.products.forEach(element => {
            if(element.price < topPrice && element.price > lowPrice)
            console.log(element.number)
        });
    }

    SizeFilter(lowSize:number,topSize:number){
        this.products.forEach(element => {
           // element = (Footwear)element;
           if(element.size < topSize && element.size > lowSize)
            console.log(element)
        })
    }

    ColorFilter(color:string,extra?:string){
        for(let i=0;i<arguments.length;i++){
            this.products.forEach(element => {
                if(arguments[i]==element.color){
                    console.log(element)
                }
            });
        }
    }
}

enum typeoffootwear {
    sneakers,
    boots,
    sandals
}

class Product{
    number: number;
    price: number;
    public constructor( _number:number, _price:number)
    {
    
        this.number = _number;
        this.price = _price;
        
    }
}


class Footwear extends Product {

    override number: number;
    readonly size:number;
    readonly color:string;
    type: typeoffootwear;
    override price: number;


    private _discount: number;

    public get age(): number {
        return this._discount;
    }
    public set discount(n: number) {
        if(n < 0 || n > 99){
            console.log("Недопустимое значение скидки!");
        }
        else{
            this._discount = n;
            this._totalPrice =this.price - this.price*this._discount/100
            

        }
    }


    private _totalPrice:number;

    public get totalPrice(): number {
        return this._totalPrice;
    }
  
    public set totalPrice(n: number) {
        if(n < 0 || n > this.price){
            console.log("Недопустимое значение стоимости товара!");
        }
        else{
            this._totalPrice = n;
            this._discount = Math.round(this._totalPrice/this.price*100-1)

        }
    }


    constructor(number:number, _size:number, _color:string,price:number, _type:typeoffootwear ){

        super(number,price)
        this.number = number;
        this.size = _size;
        this.color = _color;
        this.type = _type;
        this.price = price;
        this._discount = 0;
        this._totalPrice = price;

    }

}
let Boots:Footwear = new Footwear(1111, 11, "red", 11.99, typeoffootwear.boots)
let Sneakers:Footwear = new Footwear(2222, 22, "green", 22.99, typeoffootwear.sneakers)
let Sandals:Footwear = new Footwear(13333, 33, "blue", 33.99, typeoffootwear.sandals)

let prods = new Set<Product>

prods.add(Boots)
prods.add(Sneakers)
prods.add(Sandals)

for (let item of prods)
{
    console.log(item)
}


let products = new Set<Footwear>()

products.add(Boots)
products.add(Sneakers)
products.add(Sandals)

let FootwearShop = new Shop("footwearshop", products)
//z3
console.log("---------------zadanie 3")

FootwearShop.PriceFilter(10, 30)
FootwearShop.SizeFilter(20,30)
FootwearShop.ColorFilter("red")

//z2
console.log("---------------zadanie 2")
let elem = FootwearShop;

let itres1 = elem.next()
let itres2 = elem.next()
let itres3 = elem.next()
let itres4 = elem.next()

console.log(itres1)
console.log(itres2)
console.log(itres3)
console.log(itres4)


console.log("---------------zadanie 5")
//z5
console.log("-------------------")
console.log(Boots.price)
Boots.discount = 10
console.log(Boots.totalPrice)
console.log("-------------------")
Boots.totalPrice = 5.99
console.log(Boots)

