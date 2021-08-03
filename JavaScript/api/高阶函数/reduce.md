## JavaScript 数组（array）reduce方法详解

- [JavaScript 数组（array）reduce方法详解](#javascript-数组arrayreduce方法详解)
  - [1.语法](#1语法)
  - [2.常见用法](#2常见用法)
    - [2.1 数组求和](#21-数组求和)
    - [2.2 数组项最大值](#22-数组项最大值)
    - [2.3 数组去重](#23-数组去重)
    - [2.4 数组对象中使用](#24-数组对象中使用)
    - [2.5 字符串中字母出现的次数](#25-字符串中字母出现的次数)
    - [2.6 数组转数组（按照一定的规则转成数组）](#26-数组转数组按照一定的规则转成数组)
    - [2.7 数组转对象](#27-数组转对象)
    - [2.8 多维的叠加执行操作](#28-多维的叠加执行操作)
    - [2.9 多维的叠加执行操作](#29-多维的叠加执行操作)

### 1.语法

```js
arr.reduce(function(prev,cur,index,arr){
...
}, init);
```

`arr` ：原数组；
`prev` ：上一次调用回调时的返回值，或者初始值 init;
`cur` ： 当前正在处理的数组元素；
`index` ：当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1；
`init` ：初始值

其实常用的参数只有两个：`prev` 和 `cur`。

### 2.常见用法

#### 2.1 数组求和

```js
var arr = [1,2,3,4];

var sum = arr.reduce((prev,cur)=>{
   return prev + cur;
}) // 10
<!-- 设定初始值求和 -->
var sum = arr.reduce((prev,cur)=>{
  return prev + cur;
},10) // 20


<!-- 对象数组求和 -->
var result = [
  { subject: 'math', score: 80 },
  { subject: 'chinese', score: 90 },
  { subject: 'english', score: 80 }
];

var sum = result.reduce((prev, cur) => prev + cur.score, 0); // 250
<!--  总分扣除10分 -->
var sum = result.reduce((prev, cur) => prev + cur.score, -10);  // 240
```

#### 2.2 数组项最大值

```js
var arr = [1,2,3,4];
// 法1：
var max = arr.reduce(function (prev, cur) {
    return prev > cur ? prev : cur;
}); // 4

// 法2：:Math.max(a,b,...,x,y)    返回数个数字中较大的值 
var max = arr.reduce(function (prev, cur) {
    return Math.max(prev,cur);
}); // 4

```

#### 2.3 数组去重

```JS
var arr = [1,2,3,4,2,1,5];

var newArr = arr.reduce((prev, cur)=> {
    prev.indexOf(cur) === -1 && prev.push(cur);
    return prev;
},[]); // [1, 2, 3, 4, 5]
```


**实现的基本原理如下**：

① 初始化一个空数组；
② 将需要去重处理的数组中的第1项在初始化数组中查找，如果找不到（空数组中肯定找不到），就将该项添加到初始化数组中；
③ 将需要去重处理的数组中的第2项在初始化数组中查找，如果找不到，就将该项继续添加到初始化数组中；
④ ……
⑤ 将需要去重处理的数组中的第n项在初始化数组中查找，如果找不到，就将该项继续添加到初始化数组中；
⑥ 将这个初始化数组返回；

#### 2.4 数组对象中使用

```js
const objArr = [{name: '唐僧'},{name: '悟空'}, {name: '八戒'}, {name: '沙僧'}];

const res = objArr.reduce((pre, cur, index, arr) => {
  if (index === 0) {
    return cur.name;
  }else if (index === (arr.length - 1)) {
    return pre + '和' + cur.name;
  }else {
    return pre + '、' + cur.name;
  }
}, ''); // 唐僧、悟空、八戒和沙僧

```

#### 2.5 字符串中字母出现的次数

```js
const str = 'sfhjasfjgfarda-cm';

const res = str.split('').reduce((prev, cur) => {
  prev[cur] ? prev[cur]++ : prev[cur] = 1; 
  return prev;
}, {}); // {-: 1,a: 3,c: 1,d: 1,f: 3,g: 1,h: 1,j: 2,m: 1,r: 1,s: 2}
```

#### 2.6 数组转数组（按照一定的规则转成数组）

```js
var arr = [1, 2, 3,]; // 每个值的平方

var newarr = arr.reduce((prev, cur) => {
  prev.push(cur * cur);
   return prev;
}, []); // [1, 4, 9]
```



#### 2.7 数组转对象

```js
var streams = [{name: '开发', id: 1}, {name: '设计', id: 2}];

var obj = streams.reduce((prev, cur) => {
  prev[cur.id] = cur.name;
  return prev;
}, {}); // {1: "开发", 2: "设计"}
```



#### 2.8 多维的叠加执行操作

```js
<!-- 各科成绩占比重不一样， 求结果 -->

var result = [
  { subject: 'math', score: 80 },
  { subject: 'chinese', score: 90 },
  { subject: 'english', score: 80 }
];
var dis = {
  math: 0.5,
  chinese: 0.3,
  english: 0.2
};
var res = result.reduce((prev, cur) => dis[cur.subject] * cur.score + prev, 0); // 83

<!-- 加大难度， 商品对应不同国家汇率不同，求总价格 -->
var prices = [{price: 23}, {price: 45}, {price: 56}];
var rates = {
  us: '6.5',
  eu: '7.5',
};
var initialState = {usTotal:0, euTotal: 0};

var res = prices.reduce((prev1, cur1) => Object.keys(rates).reduce((prev2, cur2) => {
  prev1[`${cur2}Total`] += cur1.price * rates[cur2];
  return prev1;
}, {}), initialState);

var manageReducers = function() {
  return function(state, item) {
    return Object.keys(rates).reduce((nextState, key) => {
        state[`${key}Total`] += item.price * rates[key];
        return state;
      }, {});
  }
};

var res1 = prices.reduce(manageReducers(), initialState);  // {usTotal: 1612, euTotal: 1860}
```



#### 2.9 多维的叠加执行操作

```js
var arr = [[1, 2, 8], [3, 4, 9], [5, 6, 10]];
var res = arr.reduce((prev, cur) => prev.concat(cur), []);  // [1, 2, 8, 3, 4, 9, 5, 6, 10]
1
2
2.10 数组对象去重

var arr = [{id: 1, name: 'A'}, {id: 2,name: 'A'}, {id: 3,name: 'B'}, {id: 4,name: 'C'}];

var obj = {};

var newArr = arr.reduce((prev, cur) => {
  obj.hasOwnProperty(cur.name) ? '': obj[cur.name] = true && prev.push(cur);
  return prev;
}, []); 
console.log(obj,newArr);
// {A: 1, B: 2, C: 3}  [{id: 1, name: 'A'}, {id: 3,name: 'B'}, {id: 4,name: 'C'}] 

var newArr = arr.reduce((prev, cur) => {
  if(!obj.hasOwnProperty(cur.name)){
    obj[cur.name] = cur.id;
    prev.push(cur); 
  }
  return prev;
}, []); 
console.log(obj,newArr); 
// {A: 1, B: 3, C: 4}  [{id: 1, name: 'A'}, {id: 3,name: 'B'}, {id: 4,name: 'C'}] 

```



3. ### reduceRight()

该方法用法与reduce()其实是相同的，只是遍历的顺序相反，它是从数组的最后一项开始，向前遍历到第一项。