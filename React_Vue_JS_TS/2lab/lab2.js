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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Shop = /** @class */ (function () {
    function Shop(_name, _products) {
        this.pointer = 0;
        this.name = _name;
        this.products = _products;
    }
    Shop.prototype.next = function () {
        if (this.pointer < this.products.size) {
            return {
                done: false,
                value: __spreadArray([], this.products, true)[this.pointer++]
            };
        }
        else {
            return {
                done: true,
                value: null
            };
        }
    };
    Shop.prototype.PriceFilter = function (lowPrice, topPrice) {
        this.products.forEach(function (element) {
            if (element.price < topPrice && element.price > lowPrice)
                console.log(element.number);
        });
    };
    Shop.prototype.SizeFilter = function (lowSize, topSize) {
        this.products.forEach(function (element) {
            // element = (Footwear)element;
            if (element.size < topSize && element.size > lowSize)
                console.log(element);
        });
    };
    Shop.prototype.ColorFilter = function (color, extra) {
        var _loop_1 = function (i) {
            this_1.products.forEach(function (element) {
                if (arguments[i] == element.color) {
                    console.log(element);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < arguments.length; i++) {
            _loop_1(i);
        }
    };
    return Shop;
}());
var typeoffootwear;
(function (typeoffootwear) {
    typeoffootwear[typeoffootwear["sneakers"] = 0] = "sneakers";
    typeoffootwear[typeoffootwear["boots"] = 1] = "boots";
    typeoffootwear[typeoffootwear["sandals"] = 2] = "sandals";
})(typeoffootwear || (typeoffootwear = {}));
var Product = /** @class */ (function () {
    function Product(_number, _price) {
        this.number = _number;
        this.price = _price;
    }
    return Product;
}());
var Footwear = /** @class */ (function (_super) {
    __extends(Footwear, _super);
    function Footwear(number, _size, _color, price, _type) {
        var _this = _super.call(this, number, price) || this;
        _this.number = number;
        _this.size = _size;
        _this.color = _color;
        _this.type = _type;
        _this.price = price;
        _this._discount = 0;
        _this._totalPrice = price;
        return _this;
    }
    Object.defineProperty(Footwear.prototype, "age", {
        get: function () {
            return this._discount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Footwear.prototype, "discount", {
        set: function (n) {
            if (n < 0 || n > 99) {
                console.log("Недопустимое значение скидки!");
            }
            else {
                this._discount = n;
                this._totalPrice = this.price - this.price * this._discount / 100;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Footwear.prototype, "totalPrice", {
        get: function () {
            return this._totalPrice;
        },
        set: function (n) {
            if (n < 0 || n > this.price) {
                console.log("Недопустимое значение стоимости товара!");
            }
            else {
                this._totalPrice = n;
                this._discount = Math.round(this._totalPrice / this.price * 100 - 1);
            }
        },
        enumerable: false,
        configurable: true
    });
    return Footwear;
}(Product));
var Boots = new Footwear(1111, 11, "red", 11.99, typeoffootwear.boots);
var Sneakers = new Footwear(2222, 22, "green", 22.99, typeoffootwear.sneakers);
var Sandals = new Footwear(13333, 33, "blue", 33.99, typeoffootwear.sandals);
var prods = new Set;
prods.add(Boots);
prods.add(Sneakers);
prods.add(Sandals);
for (var _i = 0, prods_1 = prods; _i < prods_1.length; _i++) {
    var item = prods_1[_i];
    console.log(item);
}
var products = new Set();
products.add(Boots);
products.add(Sneakers);
products.add(Sandals);
var FootwearShop = new Shop("footwearshop", products);
//z3
console.log("---------------zadanie 3");
FootwearShop.PriceFilter(10, 30);
FootwearShop.SizeFilter(20, 30);
FootwearShop.ColorFilter("red");
//z2
console.log("---------------zadanie 2");
var elem = FootwearShop;
var itres1 = elem.next();
var itres2 = elem.next();
var itres3 = elem.next();
var itres4 = elem.next();
console.log(itres1);
console.log(itres2);
console.log(itres3);
console.log(itres4);
console.log("---------------zadanie 5");
//z5
console.log("-------------------");
console.log(Boots.price);
Boots.discount = 10;
console.log(Boots.totalPrice);
console.log("-------------------");
Boots.totalPrice = 5.99;
console.log(Boots);
