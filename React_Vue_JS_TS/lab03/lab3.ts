const isFetching: boolean = true;
const idLoading: boolean = false;

const int: number = 42;
const float: number = 4.2;
const num: number = 3e10;

const massage: string = 'hello, TS';

const numberArray: number[] = [1, 2, 3, 5, 8, 13];
const numberArray2: Array<number> = [1, 2, 5, 15, 25];

const words: string[] = ['hello', 'TS'];

//tuple
const contact: [string, number] = ['Artsiom', 2309];

//any
let variable: any = 42;
//...
variable = 'New str';
variable = [];

function sayMyName(name: string): void{
    console.log(name);
}
sayMyName('Артём');

//never
function throwErr(message: string): never{
    throw new Error(message);
}

function infinite(): never{
    while (true){

    }
}

//type
type Login = string;

const login: Login = 'admin';
//const login2: Login = 2;

type ID = string | number;
const id1: ID = 1234;
const id2: ID = '1234';
//const id3: ID = true;

type SomeTupe = string | null | undefined;

//interface------------------
interface Rect{
   readonly id: string;
   color?: string;
   size: {
    width: number;
    height: number;
   }
}
const rect1: Rect = {
    id: '1234',
    size:{
        width: 20,
        height: 30
    },
    color: '#ccc'
}
const rect2: Rect = {
    id: '6541',
    size: {
        width: 10,
        height: 5
    }
}
rect2.color = 'black';
//rect2.id = '9512'; ошибка, readonly
const rect3 = {} as Rect;
const rect4 = <Rect>{};

//-----------------------

interface RectWithArea extends Rect{
    getArea: () => number;
}

const rect5: RectWithArea = {
    id: '123',
    size: {
        width: 20,
        height: 20
    },
    getArea(): number{
        return this.size.width * this.size.height
    }
}

//-------------------------
interface IClock{
    time: Date;
    setTime(date: Date): void
}
class Clock implements IClock{
    time: Date = new Date();

    setTime(date: Date): void{
        this.time = date;
    }
}

//----------------------
interface Styles{
    [key: string]: string
}

const css: Styles = {
    border: '1px solid black',
    marginTop: '2px',
    borderRadius: '5px'
}

//enum--------------------
enum Membership{
    Simple,
    Standart,
    Premium
}

const membership = Membership.Standart;
const membershipReverse = Membership[2];

console.log(membership);
console.log(membershipReverse);

enum SocialMedia{
    INSTAGRAM = 'INSTAGRAM',
    VK = 'VK',
    FACEBOOK = 'FACEBOOK'
}
const social = SocialMedia.INSTAGRAM;
console.log(social);

function add(a: number, b: number): number {
    return a = b;
}
function toUpperCase(str: string): string {
    return str.trim().toUpperCase()
}

interface MyPosition {
    x: number | undefined
    y: number | undefined
}

interface MyPositionWithDefault extends MyPosition {
    default: string;
}
function position(): MyPosition;
//function position(a: number): MyPositionWithDefault;
function position(a: number, b: number): MyPosition;

function position(a?: number, b?: number) {
    if (!a && !b) {
        return {x: undefined, y: undefined}
    }
    if (a && !b){
        return{x: a, y: undefined, default: a.toString()}
    }
    return {x: a, y: b}
}

console.log('Empty: ', position());
//console.log('One param: ', position(42));
console.log('Two params: ', position(10, 15));

class Typescript {
    version: string;

    constructor(version: string) {
        this.version = version;
    }
    info(name: string) {
        return `[${name}]: Typescript version is ${this.version}`;
    }
}
// class Car {
//     readonly model: string;
//     readonly numberOfWheels: number = 4;

//     constructor(theModel: string) {
//         this.model = theModel;
//     }
// }

class Car {
    readonly numberOfWheels: number = 4;
    constructor(readonly model: string){}
}
//----------------------

class Animal {
    protected voice: string = '';
    public color: string = 'black';

    constructor(){
        this.go();
    }

    private go(){
        console.log('Go');
    }
}

class Cat extends Animal {
    public setVoice(voice: string): void {
        this.voice = voice;
    }
}

const cat = new Cat()
cat.setVoice('test');
console.log(cat.color);
// cat.voice

//---------------------

abstract class Component{
    abstract render(): void;
    abstract info(): string;
}

class AppComponent extends Component {
    render(): void {
        console.log('Component on render');
    }
    info(): string {
        return "this is info";
    }
}


//guards-----------
function strip(x: string | number) {
    if(typeof x === 'number'){
        return x.toFixed(2);
    }
    return x.trim()
}

class MyResponse {
    header = 'response header';
    result = 'response result'
}

class MyError {
    header = 'error header';
    message = 'error message';
}

function handle(res: MyResponse | MyError) {
    if(res instanceof MyResponse){
        return {
            info: res.header + res.result
        }
    }
    else {
        return {
            info: res.header + res.message
        }
    }
}

//---------------------
type AlertType = 'success' | 'danger' | 'warning'

function setAlertType(type: AlertType){
    //....
}

setAlertType('success');
setAlertType('warning');

//setAlertType('default');


//generic-------------------
const arrayOfNumbers: Array<number> = [1, 1, 2, 3, 5];
const arrayOfStrings: Array<string> = ['hello', 'Artsiom'];
function reverse<T>(array: T[]): T[] {
    return array.reverse();
}
reverse(arrayOfNumbers);
reverse(arrayOfStrings);

//operators---------------

interface Person {
    name: string;
    age: number;
}

type PersonKeys = keyof Person // 'name' | 'age'
let key: PersonKeys = 'name';
key = 'age';

type User = {
    _id: number;
    name: string;
    email: string;
    createdAt: Date;
}

type UserKeysNoMeta1 = Exclude<keyof User, '_id' | 'createdAt'> // 'name' | 'email'
type UserKeysNoMeta2 = Pick<User, 'name' | 'email'> // 'name' | 'email'

let ul: UserKeysNoMeta1 = 'name';
// ul = '_id'