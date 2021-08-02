Array
===

- [Array](#array)
  - [Javascript 数组常用方法](#javascript-数组常用方法)
    - [返回新数组，不改变原数组](#返回新数组不改变原数组)
      - [join](#join)
        - [concat](#concat)
        - [slice](#slice)
        - [map](#map)
        - [every](#every)
        - [some](#some)
        - [filter](#filter)
        - [reduce  reduce](#reduce--reduce)
    - [返回新数组，改变原数组](#返回新数组改变原数组)
        - [forEach](#foreach)
      - [pop](#pop)
      - [push](#push)
      - [shift](#shift)
      - [unshift](#unshift)
      - [reverse](#reverse)
      - [sort](#sort)
      - [splice](#splice)

## Javascript 数组常用方法

### 返回新数组，不改变原数组

#### join

把数组中所有元素放入一个字符串中，返回字符串。

```js
// 0.0.2/join.js
const arr = ['pr', 'is', 18];


console.log(arr.join(' ')); // pr is 18
console.log('=>');
console.log(arr); // [ 'pr', 'is', 18 ]
```

##### concat

连接多个（含两个）数组，两边的原始数组都不会变化，返回被连接数组的一个副本，可继续 `concat`。

```js
// 0.0.2/concat.js
const arr = [1, 2, 3, 4];
const arr1 = ['pr', 'is', 'a', 'boy'];
const arr2 = [5, 6, 7];

console.log(arr.concat(arr1, arr2).concat(8, 9)); // [1, 2, 3, 4, 'pr', 'is', 'a', 'boy', 5, 6, 7, 8, 9 ]
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]

```

##### slice

从开始到结束（`[)`左闭右开，即不包括结束）选择数组的一部分**浅拷贝**到一个新数组。

```js
// 0.0.2/slice.js
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(arr.slice(1, 5)); // [ 1, 2, 3, 4 ]
console.log('=>');
console.log(arr); // [ 0,1,2,3,4,5,6,7,8,9 ]

```

`slice(1, 5)` 可见里面最多含 4（`5 - 1`） 个元素，而且从第 1 

slice()可以将伪数组转换为真数组：

```js
let array = Array.prototye.slice.call(arguments)
///或者
let array = [].call(arguments)
//或者
let array = Array.from(arguments)//ES6中的新API
//ES6展开运算符
let array = [...arguments]
// 利用concat+apply
let args = Array.prototype.concat.apply([], arguments);//apply方法会把第二个参数展开
```
##### map

创建一个新数组并返回，新数组的每个元素由原数组中的每一个元素执行提供的函数而来，其中原始数组不会发生改变。

```js
// 0.0.2/map.js
const arr = [1, 2, 3, 4];

console.log(arr.map(i => i * 10 - 5)); // [ 5, 15, 25, 35 ]
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]
```

##### every

检测数组所有元素是否都符合指定条件.

- 如果数组中检测到有一个元素不满足，则整个表达式返回 `false`，且剩余的元素不会再进行检测；
- 如果所有元素都满足条件，则返回 `true`；

```js
// 0.0.2/every.js
const arr = [1, 2, 3, 4];

console.log(arr.every(i => i > 2)); // false
console.log(arr.every(i => i > 0)); // true
console.log([].every(i => i === 'pr')); // true
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]
```

##### some

用于检测数组中的元素是否满足指定条件。

- 如果有一个元素满足条件，则表达式返回 `true`, 剩余的元素不会再执行检测;
- 如果没有满足条件的元素，则返回 `false`;

```js
// 0.0.2/some.js
const arr = [1, 2, 3, 4];

console.log(arr.some(i => i > 4)); // false
console.log(arr.some(i => i > 0)); // true
console.log([].some(i => i === 'pr')); // false
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]
```

##### filter

创建一个新的数组，新数组中的元素是通过检查符合条件的所有元素。

```js
// 0.0.2/filter.js
const arr = [1, 2, 3, 4];

console.log(arr.filter(i => i > 2)); // [3, 4]
console.log([].filter(i => i === 'pr')); // []
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]
```

##### reduce  [reduce](https://github.com/Aiolimp/Aiolimp-Library/blob/main/JavaScript/Array/reduce.md)

接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。若是空数组是不会执行回调函数的;

```js
// 0.0.2/reduce.js
const arr = [1, 2, 3, 4];

console.log(arr.reduce((prev, cur) => prev + cur, 0)); // 10
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]
```

### 返回新数组，改变原数组

##### forEach

用于调用数组的每个元素，并将元素传递给回调函数，返回 `undefiend`。

```js
// 0.0.2/forEach.js
const arr = [1, 2, 3, 4];
const copy = [];

console.log(arr.forEach(i => {
    copy.push(i * 2);
}));
console.log(copy); // [ 2, 4, 6, 8 ]
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]

```

#### pop

删除数组的最后一个元素，并返回这个元素（即被删除的元素）。

- 如果数组为空，则不改变数组，返 `undefined`；

```js
// 0.0.2/pop.js
const arr = [1, 2, 3, 4];
const arr1 = [];

console.log(arr.pop()); // 4
console.log(arr1.pop()); // undefined
console.log('=>');
console.log(arr); // [ 1, 2, 3 ]
console.log(arr1); // []
```

#### push

将一个或多个元素添加到数组的末尾，返回值是**改变后的数组的长度**。

```js
// 0.0.2/push.js
const arr = [1, 2, 3, 4];

console.log(arr.push(5)); // 5
console.log(arr.push([1, 2])); // 6
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4, 5, [ 1, 2 ] ]

```

#### shift

删除数组的第一个元素，并返回这个元素。

```js
// 0.0.2/shift.js
const arr = [1, 2, 3, 4];

console.log(arr.shift()); // 1
console.log('=>');
console.log(arr); // [ 2, 3, 4 ]

```

#### unshift

将一个或多个元素添加到数组的开头，返回值是**改变后的数组的长度**。

```js
// 0.0.2/unshift.js
const arr = [1, 2, 3, 4];

console.log(arr.unshift(5, 6)); // 6
console.log(arr.unshift([1, 2])); // 7
console.log('=>');
console.log(arr); // [ [ 1, 2 ], 5, 6, 1, 2, 3, 4 ]

```

#### reverse

颠倒数组中元素的位置，返回该数组的引用。

```js
// 0.0.2/reverse.js
const arr = [1, 2, 3, 4];
const hello = 'hello';
const helloArray = hello.split('');

console.log(helloArray.reverse().join('')); // olleh
console.log(arr.reverse()); // [ 4, 3, 2, 1 ]
console.log('=>');
console.log(arr); // [ 4, 3, 2, 1 ]
console.log(helloArray); // [ 'o', 'l', 'l', 'e', 'h' ]

```

#### sort

对数组的元素进行排序，并返回数组。排序不一定是稳定的。默认排序顺序是根据字符串 Unicode 码点。

```js
// 0.0.2/sort.js
const arr = [1, 2, 3, 4, 10, 12, 22];

console.log(arr.sort()); // [ 1, 10, 12, 2, 22, 3, 4];
console.log('=>');
console.log(arr); // [ 1, 10, 12, 2, 22, 3, 4];

```

#### splice

向数组中添加/删除项目，然后返回被删除项目。

```js
// 0.0.2/splice.js
const arr = [1, 2, 3, 4];

console.log(arr.splice(1, 2, 10, 12)); // [ 2, 3 ]
console.log('=>');
console.log(arr); // [ 1, 10, 12, 4 ]
```

  


