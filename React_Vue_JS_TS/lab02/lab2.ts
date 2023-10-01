interface Iterator<T>{
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

abstract class Footwear
{
    public readonly unID: number
    public readonly size: number
    public readonly color: string
    public readonly cost: number

    private discount: number = 0
    private finPrice: number = 0

    set Discount(value:number)
    {
        this.discount = value
        this.finPrice = this.cost - this.cost * (value/100)
    }
    get Discount()
    {
        return this.discount;
    }

    set FinPrice(value:number)
    {
        this.finPrice = value;
        this.discount = 100*(this.cost - value)/this.cost;
    }
    get FinPrice()
    {
        return this.finPrice;
    }



    constructor(unId:number, size:number, color: string, cost: number)
    {
        this.unID = unId
        this.size = size
        this.color = color
        this.cost = cost
    }

}

class Boots extends Footwear
{
    constructor(unId:number, size:number, color: string, cost: number)
    {
        super(unId, size, color, cost)
    }
}

class Sneakers extends Footwear
{
    constructor(unId:number, size:number, color: string, cost: number)
    {
        super(unId, size, color, cost)
    }
}

class Slippers extends Footwear
{
    constructor(unId:number, size:number, color: string, cost: number)
    {
        super(unId, size, color, cost)
    }
}

let Test3: Footwear = new Boots(2, 43, "Red", 100)
let Test2: Footwear = new Sneakers(3, 42, "Blue", 75)
let Test1: Footwear = new Slippers(1, 40, "Black", 50)


class Products implements Iterator<Footwear>{

    private pointer = 0


    public Footwears: Footwear[];
    constructor()
    {
        this.Footwears = []
    }

    
    public next(): IteratorResult<Footwear> {
        if (this.pointer < this.Footwears.length) {
            return {
                done: false,
                value: this.Footwears[this.pointer++],
            };
        } else {
            return {
                done: true,
                value: null,
            };
        }
    }

}

class Filters
{

    public static PriceFilter(A: Products, price: number): void{
        console.log("Товары в диапазоне цены до " + price)
        for(let item of A.Footwears)
        {
            if(item.cost < price)
                console.log("Товар №" + item.unID)
        }
    }

    public static SizeFilter(A: Products, size: number): void
    {
        console.log("Товары с размером " + size)
        for(let item of A.Footwears)
        {
            if(item.size == size)
                console.log("Товар №" + item.unID)
        }
    }

    public static ColorFilter(A: Products, col: string): void
    {
        console.log("Товары с цветом " + col)
        for(let item of A.Footwears)
        {
            if(item.color == col)
                console.log("Товар №" + item.unID)
        }
    }

}

let products = new Products()

products.Footwears.push(Test1, Test2, Test3)
    
//итератор
console.log("----------------------------")
console.log("Товары хранилища:")
console.log(products.next())
console.log(products.next())
console.log(products.next())
console.log(products.next())
console.log("----------------------------")
//фильтры
console.log("----------------------------")
Filters.PriceFilter(products, 80)
Filters.SizeFilter(products, 43)
Filters.ColorFilter(products, "Red")
console.log("----------------------------")
//Сетеры
console.log("----------------------------")
Test1.Discount = 10
console.log(Test1)
Test1.FinPrice = 25
console.log(Test1)
console.log("----------------------------")

let obj = {
    nm : "Artsiom"
}

Object.defineProperty(obj, "nm", {writable: false})
Object.defineProperty(obj, "nm", {configurable: false})
