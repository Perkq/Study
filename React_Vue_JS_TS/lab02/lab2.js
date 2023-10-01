var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Footwear = /** @class */ (function () {
    function Footwear(unId, size, color, cost) {
        this.discount = 0;
        this.finPrice = 0;
        this.unID = unId;
        this.size = size;
        this.color = color;
        this.cost = cost;
    }
    Object.defineProperty(Footwear.prototype, "Discount", {
        get: function () {
            return this.discount;
        },
        set: function (value) {
            this.discount = value;
            this.finPrice = this.cost - this.cost * (value / 100);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Footwear.prototype, "FinPrice", {
        get: function () {
            return this.finPrice;
        },
        set: function (value) {
            this.finPrice = value;
            this.discount = 100 * (this.cost - value) / this.cost;
        },
        enumerable: false,
        configurable: true
    });
    return Footwear;
}());
var Boots = /** @class */ (function (_super) {
    __extends(Boots, _super);
    function Boots(unId, size, color, cost) {
        return _super.call(this, unId, size, color, cost) || this;
    }
    return Boots;
}(Footwear));
var Sneakers = /** @class */ (function (_super) {
    __extends(Sneakers, _super);
    function Sneakers(unId, size, color, cost) {
        return _super.call(this, unId, size, color, cost) || this;
    }
    return Sneakers;
}(Footwear));
var Slippers = /** @class */ (function (_super) {
    __extends(Slippers, _super);
    function Slippers(unId, size, color, cost) {
        return _super.call(this, unId, size, color, cost) || this;
    }
    return Slippers;
}(Footwear));
var Test3 = new Boots(2, 43, "Red", 100);
var Test2 = new Sneakers(3, 42, "Blue", 75);
var Test1 = new Slippers(1, 40, "Black", 50);
var Products = /** @class */ (function () {
    function Products() {
        this.pointer = 0;
        this.Footwears = [];
    }
    Products.prototype.next = function () {
        if (this.pointer < this.Footwears.length) {
            return {
                done: false,
                value: this.Footwears[this.pointer++],
            };
        }
        else {
            return {
                done: true,
                value: null,
            };
        }
    };
    return Products;
}());
var Filters = /** @class */ (function () {
    function Filters() {
    }
    Filters.PriceFilter = function (A, price) {
        console.log("Товары в диапазоне цены до " + price);
        for (var _i = 0, _a = A.Footwears; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.cost < price)
                console.log("Товар №" + item.unID);
        }
    };
    Filters.SizeFilter = function (A, size) {
        console.log("Товары с размером " + size);
        for (var _i = 0, _a = A.Footwears; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.size == size)
                console.log("Товар №" + item.unID);
        }
    };
    Filters.ColorFilter = function (A, col) {
        console.log("Товары с цветом " + col);
        for (var _i = 0, _a = A.Footwears; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.color == col)
                console.log("Товар №" + item.unID);
        }
    };
    return Filters;
}());
var products = new Products();
products.Footwears.push(Test1, Test2, Test3);
//итератор
console.log("----------------------------");
console.log("Товары хранилища:");
console.log(products.next());
console.log(products.next());
console.log(products.next());
console.log(products.next());
console.log("----------------------------");
//фильтры
console.log("----------------------------");
Filters.PriceFilter(products, 80);
Filters.SizeFilter(products, 43);
Filters.ColorFilter(products, "Red");
console.log("----------------------------");
//Сетеры
console.log("----------------------------");
Test1.Discount = 10;
console.log(Test1);
Test1.FinPrice = 25;
console.log(Test1);
console.log("----------------------------");
var obj = {
    nm: "Andrey"
};
Object.defineProperty(obj, "nm", { writable: false });
Object.defineProperty(obj, "nm", { configurable: false });
