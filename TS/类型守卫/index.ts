// 类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。 换句话说，类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数值。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。目前主要有四种的方式来实现类型保护：
//1. in 关键字;
// in 用于检查 对象是否具有某个属性。
type Car = { brand: string; drive: () => void };
type Boat = { brand: string; sail: () => void };

function operate(vehicle: Car | Boat) {
  if ('drive' in vehicle) {
    vehicle.drive();
  } else {
    vehicle.sail();
  }
}

const myCar: Car = { brand: 'Tesla', drive: () => console.log('Driving...') };
const myBoat: Boat = { brand: 'Yacht', sail: () => console.log('Sailing...') };

operate(myCar); // Driving...
operate(myBoat); // Sailing...

//2. typeof 关键字;
// typeof 适用于检查 number、string、boolean、symbol、bigint、object、function 等基本类型。

const str = 'aiolimp';
const obj = { name: 'aiolimp' };
const nullVar = null;
const undefinedVar = undefined;

const func = (input: string) => {
  return input.length > 10;
};

type Str = typeof str; // "aiolimp"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean
// 不仅可以直接在类型标注中使用 typeof，还能在工具类型中使用 typeof。
const func2: typeof func = (name: string) => {
  return name === 'linbudu';
};

//3. instanceof 关键字;
// instanceof 用于检查一个对象是否是另一个对象的实例。
class Animal {
  makeSound() {
    console.log('Some sound...');
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof!');
  }
}

function makeNoise(animal: Animal) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.makeSound();
  }
}

const dog = new Dog();
makeNoise(dog); // Woof!

// 4. 自定义类型谓词（is 关键字）
// 自定义类型守卫使用 返回 value is Type 形式的函数，明确告诉 TypeScript 变量的具体类型。
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(animal: Fish | Bird): animal is Fish {
  return (animal as Fish).swim !== undefined;
}

function move(animal: Fish | Bird) {
  if (isFish(animal)) {
    animal.swim();
  } else {
    animal.fly();
  }
}

const fish: Fish = { swim: () => console.log('Swimming...') };
const bird: Bird = { fly: () => console.log('Flying...') };

move(fish); // Swimming...
move(bird); // Flying...
