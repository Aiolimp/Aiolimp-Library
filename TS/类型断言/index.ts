// 1.类型断言
// 解决的问题：保证和检测来自其他地方的数据也符合我们的要求
// 类型断言的两种方式
// 1.1 尖括号语法
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;
console.log(strLength);
// 1.2 as语法
let someValue2: any = 'this is a string';
let strLength2: number = (someValue2 as string).length;
console.log(strLength2);

// 2.非空断言
// 解决的问题：当我们确定一个变量不为空时，我们可以使用非空断言来告诉TypeScript编译器，该变量不为空
// 2.1 忽略 undefined 和 null 类型
function myFunc(maybeString: string | undefined | null) {
  const onlyString: string = maybeString; // error:不能将类型“string | null | undefined”分配给类型“string”
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}

// 2.2调用函数时忽略 undefined 类型
type NumGenerator = () => number;

function myFunc2(numGenerator: NumGenerator | undefined) {
  const num1 = numGenerator(); // error:numGenerator”可能为“未定义。
  const num2 = numGenerator!(); //OK
}

// 2.3确定赋值断言
// let x: number;
// initialize();
// console.log(2 * x); // Error:在赋值前使用了变量“x”
// function initialize() {
//   x = 10;
// }

// 很明显该异常信息是说变量 x 在赋值前被使用了，要解决该问题，我们可以使用确定赋值断言
let x!: number;
initialize();
console.log(2 * x); // Ok
function initialize() {
  x = 10;
}

// 2.4 双重断言
// 解决的问题：当我们需要将一个联合类型断言为更加具体的类型时，我们可以使用双重断言
// const str: string = 'linbudu';
// // 从 X 类型 到 Y 类型的断言可能是错误的，blabla
// (str as { handler: () => {} }).handler();
const str: string = 'linbudu';
(str as unknown as { handler: () => {} }).handler();
// 使用尖括号断言
(<{ handler: () => {} }>(<unknown>str)).handler();
