"use strict"

document.addEventListener("DOMContentLoaded", () => {
    function firstTask() {

        let defaultRect = {
            geomFigure: "Rectangle",
            width: 200,
            height: 200,
            color: "YELLOW",
            borderColor: "BLACK",
        }

        let customRect = {
            width: 100,
            height: 100,
        }

        customRect.__proto__ = defaultRect;

        let defaultCirq = {
            geomFigure: "Cirqle",
            width : 200,
            height : 200,
            color : "WHITE",
            borderColor: "BLACK"
        }

        let customCirq = {
            color : "GREEN",
        }

        customCirq.__proto__ = defaultCirq;

        let defaultTrian = {
            geomFigure: "Triangle",
            width: 200,
            height: 200,
            color: "WHITE",
            borderColor: "BLACK",
            numOfLines: 1
        }

        let customTrian = {
            numOfLines: 3
        }

        customTrian.__proto__ = defaultTrian;

        let cirqDiff = "Отличительные черты:\n";
        for(let key in customCirq) {
            if(customCirq[key] != defaultCirq[key]) cirqDiff += "Свойство: " + key + " со значением " + customCirq[key];
        }
        alert(cirqDiff);

        let trianIm = "Описывающие черты:\n";
        for(let key in customTrian) {
            trianIm += "Свойство: " + key + " значение " + customTrian[key] + "\n";
        }
        alert(trianIm);

        let colorInst = false;
        for(let key in customRect) {
            if(key == "color") colorInst = true;
        }
        colorInst? alert("Есть") : alert("Нету");
    }

    firstTask();

    class Product {
        constructor(photo, name, cost) {
            this.photo = photo;
            this.name = name;
            this.cost = cost;
        }

        get photo() {
            return this._photo;
        }

        set photo(newPhoto) {
            this._photo = newPhoto;
        }
        
        get name() {
            return this._name;
        }

        set name(newName) {
            this._name = newName;
        }

        get cost() {
            return this._cost;
        }

        set cost(newCost) {
            this._cost = newCost;
        }

        createHTMLElem() {
            let containerDiv = document.createElement("div");
            containerDiv.id = this.name;
            containerDiv.style.width = "200px";
            containerDiv.style.display = "inline-block";

            let photoCont = document.createElement("img");
            photoCont.src = this.photo;
            photoCont.width = "200";
            photoCont.height = "200";

            let nameCont = document.createElement("div");
            nameCont.style.textAlign = "center";
            nameCont.style.width = "200px";
            let nameText = document.createTextNode(this.name);
            nameCont.appendChild(nameText);

            let costCont = document.createElement("div");
            costCont.style.textAlign = "center";
            costCont.style.width = "200px";
            let costText = document.createTextNode(this.cost);
            costCont.appendChild(costText);

            containerDiv.appendChild(photoCont);
            containerDiv.appendChild(nameCont);
            containerDiv.appendChild(costCont);



            let mainContDiv = document.getElementById("products");
            mainContDiv.insertAdjacentElement('beforeend', containerDiv);
        }

        deleteHTMLElem() {
            document.getElementById("products").removeChild(document.getElementById(this.name));
        }
        }

        let example = new Product("nout.jpg", "MACBOOK PRO", "5000$");
        example.createHTMLElem();

        let example2 = new Product("nout.jpg", "Lenovo legion", "2500$");
        example2.createHTMLElem();

        let example3 = new Product("nout.jpg", "Asus", "1$");
        example3.createHTMLElem();

        example.deleteHTMLElem();


        class Button {
            constructor(width, height, bgcolor, borderRad, text) {
                this.width = width;
                this.height = height;
                this.bgcolor = bgcolor;
                this.borderRad = borderRad;
                this.text = text;
            }

            get width() {
                return this._width;
            }

            set width(newWidth) {
                this._width = newWidth;
            }

            get height() {
                return this._height;
            }

            set height(newHeight) {
                this._height = newHeight;
            }

            get bgcolor() {
                return this._bgcolor;
            }

            set bgcolor(newBgColor) {
                this._bgcolor = newBgColor;
            }

            get borderRad() {
                return this._borderRad;
            }

            set borderRad(newBorderRad) {
                this._borderRad = newBorderRad;
            }

            get text() {
                return this._text;
            }

            set text(newText) {
                this._text = newText;
            }

            createButton(mainContainer) {
                let containerDiv = document.createElement("button");
                containerDiv.style.width = this.width;
                containerDiv.style.height = this.height;
                containerDiv.style.backgroundColor = this.bgcolor;
                containerDiv.style.borderRadius = this.borderRad;
                
                let objText = document.createTextNode(this.text);
                containerDiv.appendChild(objText);
                if(mainContainer == undefined) {
                    containerDiv.style.marginLeft = "70%";
                    document.body.insertAdjacentElement('afterbegin', containerDiv);
                } else {
                    containerDiv.style.marginLeft = "30%";
                    mainContainer.insertAdjacentElement('beforeend', containerDiv);
                }
            }

            deleteButton() {
                this.style.display = "none";
            }
        }

        let butEx = new Button("50", "40", "BLUE", "30px", "В корзину");
        butEx.createButton(document.getElementById("Asus"));

        butEx.createButton(document.getElementById("Lenovo legion"));

        let newButKorz = new Button("100", "40", "RED", "30px", "Корзина");
        // newButKorz.deleteButton();

        newButKorz.createButton();


})