
document.addEventListener("DOMContentLoaded", () => {
    function firstTask() {
    function noParams() {
        let paramsNum = noParams.arguments.length; 
        let arrayOfParams = noParams.arguments;

        if(paramsNum <= 3) {
            let sumParams = "";
            for(let elem of arrayOfParams) {
                sumParams += elem;
            }
            alert("Строка из всех параметров: " + sumParams);
        }

        if(paramsNum > 3 && paramsNum <= 5) {
            let listOfTypes = "";
            for(let elem of arrayOfParams) {
                listOfTypes += typeof elem + " ";
            }
            alert("Строка с типами каждого параметра: " + listOfTypes);
        }

        if(paramsNum > 5 && paramsNum <= 7) {
            alert(paramsNum);
        }

        if(paramsNum > 7) {
            alert("Параметров слишком много!");
        }
    }

    noParams(123, "qwe");
    noParams(123, "kek", 456.214, true);
    noParams(123, "qwe", 142.124, "qwewqr", false, true);
    noParams(123, 456, 789, "asdasd", false, "kek", 12421.213123, true);
    }

    function secondTask() {
        switch (+prompt("Введите номер проверки")) {
            case 1:
                window.a;
                alert(a);       // a не определено
                break;
            case 2:
                alert(j);       // j не определено
                window.j = 2;
                break;
            case 3:
                alert(q);       // нету доступа к 'a' до иницилизации
                window.q = 2;
                let q;
                break;
            case 4:
                alert(g);       // undefined
                window.g = 2;
                var g;       
                break;
            case 5:
                alert(b);       // нету доступа к 'b' до иницилизации
                let b = 2;
                break;
            case 6:
                let c = 2;
                window.c = 3;
                alert(с);       // с не определено
                break;
            case 7:
                var d = 2;
                window.d = 3;
                alert(d);       // вывод: 2
                break;
            case 8:
                secondTask();
                break;
            default:
                break;
        }
    }    

    function thirdTask() {
        let s = 5;
        function sum() {
            alert(s);           // выведет 5
        }

        sum();
    }

    function fourthTask() {
        function makeCounter() {
            let currentCount = 1;
            return function() {
                return currentCount++;
            };
        }

        // let counter = makeCounter();
        // alert( counter() );              // 1
        // alert( counter() );              // 2
        // alert( counter() );              // 3

        // let counter2 = makeCounter();;
        // alert( counter2() );             // 1

        let counter = makeCounter();
        let counter2 = makeCounter();

        alert( counter() );                 // 1
        alert( counter() );                 // 2

        alert( counter2() );                // 3
        alert( counter2() );                // 4
    }

    function fifthTask() {                  // ????????????????????????????
        alert(firstTask.name);
        alert(secondTask.name);
        alert(thirdTask.name);
        alert(fourthTask.name);
        alert(fifthTask.name);
        alert(sixthTask.name);
        alert(seventhTask.name);
    }

    function sixthTask() {
        function curry(f) {
            return function(a) {
                return function(b) {
                    return function(c) {
                        return f(a, b, c);
                    }
                }
            }
        }

        function getVolume(a, b, c) {
            return a * b * c;
        }

        let curriedVol = curry(getVolume);

        alert( curriedVol(1)(2)(3));
    }
    
    function seventhTask() {
        let moveObj = document.getElementById("move");
        let flag = true;
        
        while(flag)
        switch (prompt("Введите куда двигаться")) {
            case "left":
                moveObj.style.left = +moveObj.getBoundingClientRect().x - 10 + 'px';
                break;
            case "right":
                moveObj.style.left = +moveObj.getBoundingClientRect().x + 10 + 'px';
                break;
            case "up":
                moveObj.style.top = +moveObj.getBoundingClientRect().y - 10 + 'px';
                break;
            case "down":
                moveObj.style.top = +moveObj.getBoundingClientRect().y + 10 + 'px';
                break;
            default:
                flag = false;
                break;
        }
    }

    while(true) {
        switch (+prompt("Введите номер задания: ")) {
            case 1:
                firstTask();
                break;
            case 2:
                secondTask();
                break;
            case 3:
                thirdTask();
                break;
            case 4:
                fourthTask();
                break;
            case 5:
                fifthTask();
                break;
            case 6:
                sixthTask();
                break;
            case 7:
                seventhTask();
                break;
            default:
                return false;
                break;
        }
    }
})