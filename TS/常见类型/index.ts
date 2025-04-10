// number（数字类型）
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xff; // 十六进制
let binary: number = 0b1010; // 二进制
let octal: number = 0o744; // 八进制

// string（字符串类型）

let firstName: string = 'Alice';
let greeting: string = `Hello, ${firstName}!`; // 模板字符串

// boolean（布尔类型）

let isDone: boolean = true;
let hasPermission: boolean = false;

// null 和 undefined（空值和未定义类型）
let u: undefined = undefined;
let n: null = null;
// 默认情况下，null 和 undefined 只能赋值给 null 或 undefined，但如果 strictNullChecks 关闭，它们也可以赋值给其他类型。

// bigint（大整数）
let bigNum: bigint = 12345678901234567890n;

// symbol（唯一值）
const sym1: symbol = Symbol('unique');
const sym2: symbol = Symbol('unique');
console.log(sym1 === sym2); // false

// 数组类型
// 数组类型用来表示元素类型一致的数组。可以通过两种方式定义数组类型：
const list: number[] = [1, 2, 3];
const lsit2: Array<number> = [1, 2, 3];

// 元组类型
// 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同。
let x: [string, number] = ['hello', 10];
x = ['hello', 10]; // 合法
x = [10, 'hello']; // 不合法

// 当访问一个已知索引的元素，会得到正确的类型：
console.log(x[0].substring(1));
// 当访问一个越界的元素，会使用联合类型替代：
console.log(x[1].substring(1));

// 枚举类型
// 枚举类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

// 任意类型
// 任意类型（Any）用来表示允许赋值为任意类型。
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false;

// 空值
// 空值（Void）用来表示没有任何类型。
function warnUser(): void {
  console.log('This is my warning message');
}

// Unknown 类型
// unknown 类型表示未知类型的值，类似于 any，但更安全，因为对 unknown 类型的值进行操作之前需要进行类型检查。
let v: unknown = 12;
v = 'hello';
v = true;

if (typeof v === 'string') {
  console.log(v.toUpperCase());
}

// Never 类型
// Never 类型表示那些永不存在的值的类型，例如抛出错误或无限循环。
function error(message: string): never {
  throw new Error(message);
}

// 函数类型
// 函数类型用来表示函数的类型，包括参数类型和返回值类型。
function add(x: number, y: number): number {
  return x + y;
}

// 交叉类型
// 交叉类型用来组合多个类型成一个类型，表示对象可以同时具有多个类型的成员。
interface Person {
  name: string;
  age: number;
}
interface Employee {
  salary: number;
}
type EmployeePerson = Person & Employee;
const ep: EmployeePerson = {
  name: 'John',
  age: 30,
  salary: 50000,
};

// 索引类型
// 索引类型允许使用动态属性名来访问类型中的属性。
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person; // "name" | "age"
type NameType = Person['name']; // string

// 条件类型
// 条件类型是一种基于类型的条件判断语法，可以根据条件返回不同的类型。语法如下：
type Check<T> = T extends string ? string : number;
type Result1 = Check<string>; // string
type Result2 = Check<number>; // number

// 联合类型
// 联合类型允许一个变量可以是几种类型之一。用竖线 | 分隔不同的类型。
type MyUnion = string | number | boolean;
let value: MyUnion;
value = 'Hello'; // 合法
value = 123; // 合法
value = true; // 合法
value = {}; // 不合法

// 递归类型
// 递归类型是指类型引用自身的一部分，用于定义复杂的嵌套结构，如树结构、链表等。
interface TreeNode {
  value: string;
  children?: TreeNode[];
}

const tree: TreeNode = {
  value: 'root',
  children: [
    { value: 'child1' },
    {
      value: 'child2',
      children: [{ value: 'grandchild1' }],
    },
  ],
};

// 映射类型
// 映射类型允许根据已有类型创建新类型，通过遍历已有类型的属性来生成新类型。
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type User = {
  name: string;
  age: number;
};

type ReadonlyPerson = MyReadonly<User>;

const User: ReadonlyPerson = {
  name: 'Alice',
  age: 30,
};

User.name = 'Bob'; // 报错，name 是只读属性
