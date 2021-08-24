JavaScript代码技巧
---
- [JavaScript代码技巧](#javascript代码技巧)
  - [1.随机获取布尔值](#1随机获取布尔值)
  - [2.获取数组中的唯一值(数组去重)](#2获取数组中的唯一值数组去重)
  - [3.滚动到页面顶部](#3滚动到页面顶部)
  - [4.计算两个日期之间的天数](#4计算两个日期之间的天数)
  - [5.查找数组元素位置](#5查找数组元素位置)
  - [6.添加元素(末尾添加)](#6添加元素末尾添加)
  - [7.移除数组中的元素(返回原数组)](#7移除数组中的元素返回原数组)
  - [8.移除数组中的元素(返回新的数组)](#8移除数组中的元素返回新的数组)
  - [9.数组求和](#9数组求和)
  - [10.删除数组最后一个元素](#10删除数组最后一个元素)
  - [11.添加元素(开头添加)](#11添加元素开头添加)
  - [12.合并数组](#12合并数组)
  - [13.添加元素(指定位置添加)](#13添加元素指定位置添加)
  - [14.计数](#14计数)
  - [15.查找重复元素](#15查找重复元素)
### 1.随机获取布尔值

此函数将使用`Math.random()`方法返回布尔值（真或假）。
`Math.random`创建一个介于0和1之间的随机数，然后我们检查它是否大于或小于0.5。
这意味着有50/50的机会会得到对或错。

```javascript
const getRandomBoolean = () => Math.random() >= 0.5;


console.log(getRandomBoolean());
// a 50/50 chance of returning true or false
```

### 2.获取数组中的唯一值(数组去重)

从数组中删除所有重复值的非常简单的方法。此函数将数组转换为Set，然后返回数组。

```javascript
const uniqueArr = (arr) => [...new Set(arr)];

console.log(uniqueArr([1, 2, 3, 1, 2, 3, 4, 5]));
// [1, 2, 3, 4, 5]
```

### 3.滚动到页面顶部

所述`window.scrollTo（）`方法把一个`X`和`Y`坐标滚动到。
如果将它们设置为零和零，我们将滚动到页面顶部。

```javascript
const scrollToTop = () => window.scrollTo(0, 0);

scrollToTop();
```

### 4.计算两个日期之间的天数

我们首先找到两个日期之间的绝对值，然后将其除以86400000（等于一天中的毫秒数），最后将结果四舍五入并返回。

```javascript
const daysDiff = (date, date2) => Math.ceil(Math.abs(date - date2) / 86400000);

console.log(daysDiff(new Date( 2021-05-10 ), new Date( 2021-11-25 )));
// 199
```

### 5.查找数组元素位置

```javascript
function indexOf(arr, item) {
    if(Array.prototype.indexOf){// 判断浏览器是否支持indexOf方法
        return arr.indexOf(item);
    }else{
        for(var i=0;i<arr.length;i++){
            if(arr[i]===item){
                return i;
            }
        }
    }
    return -1;
}
```

### 6.添加元素(末尾添加)

**方法一：普通的for循环拷贝+push**

```javascript
function append(arr, item) {
    let resArr = []
    for(let i = 0;i<arr.length;i++){
        resArr.push(arr[i]) 
    }
    resArr.push(item)
    return resArr
}

```

**方法二：使用concat将传入的数组或非数组值与原数组合并,组成一个新的数组并返回**

```javascript
function append(arr, item) {
    return arr.concat(item);
}

```

**方法三：使用slice浅拷贝+push**

```javascript
function append(arr, item) {
     let newArr = arr.slice(0);  // slice(start, end)浅拷贝数组
    newArr.push(item);
    return newArr;
}

```

**方法四：`...`扩展运算符** 如果不知道的，可以看看es6的相关知识

```javascript
function append(arr, item) {
let resArr = [...arr,item]
return resArr
}
```

### 7.移除数组中的元素(返回原数组)

**移除数组arr中的所有值与item相等的元素，直接在给定的arr数组上进行操作，并将结果返回。**

这里需要注意理解题目，是直接操作原数组，所以不能出现newArr

**方法一：普通for循环+splice**

```javascript
function removeWithoutCopy(arr, item) {
    for(let i=arr.length;i>=0;i--){
        if(arr[i]==item){
            arr.splice(i,1);
        }
    }
    return arr;
}

```

**方法二：方法一的另外一种写法**

在这里要注意在删除掉一个元素时，要 i–，即删除这个元素后，其他元素位置往前移。

```javascript
function removeWithoutCopy(arr, item) {
    for(let i = 0; i< arr.length; i++) {
        if(arr[i]===item) {
            arr.splice(i,1);
            i--;
        }
    }
    return arr;
}
```

### 8.移除数组中的元素(返回新的数组)

**移除数组arr中的所有值与item相等的元素，不直接修改数组arr，结果返回新的数组。**

**方法一：filter过滤**

```javascript
function remove(arr, item) {
     return arr.filter(res =>{
         return res != item;
    })
}

```

**方法二：for循环+push**

```javascript
function remove(arr, item) {
    let resArr = []
    for(let i = 0;i<arr.length;i++){
        if(arr[i]!== item){
            resArr.push(arr[i])
        }
    }
    return resArr
}

```

**方法三：forEach+push（效率高于for循环）**

```javascript
function remove(arr, item) {
    let resArr=[];
    arr.forEach(v=>{
        if(v!==item){
            resArr.push(v);
        }
    })
    return resArr;
}

```

**方法四：for循环+splice**

```javascript
function remove(arr,item){
    let resArr= arr.slice(0);
    for(let i=0;i<resArr.length;i++){
        if(resArr[i] == item){
            resArr.splice(i,1);
            i--;
        }
    }
    return resArr;
}
```

### 9.数组求和

**方法一：普通for循环**

```javascript
function sum(arr) {
    let res = 0
    for(let i=0;i<=arr.length;i++){
        res +=arr[i]
    }
    return res
}
```

**方法二：forEach循环**

```javascript
function sum(arr) {
    let res = 0
arr.forEach((value,index,array)=>{
    array[index] == value;    //结果为true
     res+=value;  
    });
    return res;
};
```

**方法三：reduce**

reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值，具体可以看看es6相关知识。

```
function sum(arr) {
    return arr.reduce((pre,cur)=>{
        return pre+cur;
    })
}
```

**方法四：eval**

eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。

```
function sum(arr) {
     return eval(arr.join("+"));
}
```

### 10.删除数组最后一个元素

**删除数字arr最后一个元素。不要直接修改数组arr，结果返回新的数组。**

**方法一：slice**

```javascript
function truncate(arr) {
  return arr.slice(0,arr.length-1)
}
```

**方法二：concat/slice+pop**

```javascript
function truncate(arr) {
  let resArr = arr.concat()
  // let resArr = arr.slice(0)
  resArr.pop()
  return resArr
}
```

### 11.添加元素(开头添加)

**在数字arr开头添加元素item。不要直接修改数组arr，结果返回新的数组。**

**concat/slice/arr.join().split(',')+unshift**

```javascript
  function prepend(arr, item) {
            // let resArr = arr.slice(0);
            // let resArr = arr.concat()
             let resArr = arr.join().split(',')
            resArr.unshift(item);
            return resArr;
        }
```

### 12.合并数组

**方法一：concat**



```javascript
function concat(arr1, arr2) {
    let resArr = arr1.concat(arr2)
    return resArr
}
```

**方法二：`...`扩展运算符**

```javascript
function concat(arr1, arr2) {
    let resArr = [...arr1,...arr2]
    return resArr
}

```

**方法三：slice+push.apply**

```javascript
function concat(arr1, arr2) {
    let resArr = arr1.slice(0);
            [].push.apply(resArr,arr2);
            return resArr;
}
```

### 13.添加元素(指定位置添加)

**方法一：先复制前0~index个元素，将item元素插入之后，再拼接index之后的元素**

```javascript
function insert(arr, item, index) {
    let resArr = arr.slice(0,index)
    resArr.push(item)
    resArr = resArr.concat(arr.slice(index))
    return resArr
}

```

**方法二：使用splice方法插入（效率较高）**

```javascript
function insert(arr, item, index) {
    let  resArr = arr.slice(0);//
            resArr.splice(index,0,item);
            return resArr;
}

```

**方法三：push.apply+splice**

```javascript
function insert(arr, item, index) {
let resArr=[];
[].push.apply(resArr, arr);
resArr.splice(index,0,item);
return resArr;
}
```

### 14.计数

**统计数组arr中值等于item的元素出现的次数**

**方法一：普通for循环**

```javascript
function count(arr, item) {
    let reSCount = 0
    for(let i = 0;i<=arr.length;i++){
        if(arr[i] === item){
            reSCount++
        }
    }
    return reSCount
}

```

**方法二：forEach**

```javascript
function count(arr, item) {
    let resCount=0;
    arr.forEach(v => {
        if(v==item){
            resCount++;
        }
    });
    return resCount;
}

```

**方法三：filter**

```javascript
function count(arr, item) {
   let res = arr.filter(v => {
       return v === item
    });
    return res.length;
}
```

**方法四：map（效率高于filter）**

```javascript
function count(arr, item) {
    let resCount = 0
   arr.map(v => {
       if(v === item){
           resCount++
       }
    });
    return resCount;
}

```

map函数和filter有点像，但是map是对数组中的所有元素进行复核函数条件的处理，最终得到的是一个新数组，元素个数不变。

filter函数虽然也是返回一个新数组，但是元素的个数等于复核函数条件的元素总和。

**方法五：reduce**

```javascript
 function count(arr, item) {
     let res = arr.reduce( (init,curr)=> {
       //如果当前置等于item，该函数值加一
       return curr === item ? init+1:init;
      },0)
      return res;
  }
```

### 15.查找重复元素

**方法一：for/for in/+sort** 先进行排序，然后判断排序之后的前一个数据是否等于后一个数据，如果是且结果数组没有这个元素

```javascript
//for 运行时间：1596ms 占用内存：77772k
function duplicates(arr) {
    let resArr = [];
    arr.sort();
    for(let i=0;i<arr.length;i++){
        if(arr[i]==arr[i-1] && resArr.indexOf(arr[i])==-1){
            resArr.push(arr[i]);
        }
    }
    return resArr;
}
//for in  运行时间：1132ms占用内存：77868k
function duplicates(arr) {
    let resArr = [];
    arr.sort();
    for(i in arr){
        if(arr[i]==arr[i-1] && resArr.indexOf(arr[i])==-1){
            resArr.push(arr[i]);
        }
    }
    return resArr;
}

```

**方法二：forEach** 利用索引判断是否重复（使用了两次）

```javascript
// 运行时间：1184ms 占用内存：77772k
function duplicates(arr) {
    var resArr=[];
    arr.forEach(v => {
     //判断原数组是否有重复数据
     //判断结果数组是否已经具有该数据
       if(arr.indexOf(v) !=arr.lastIndexOf(v) && resArr.indexOf(v) == -1){
           resArr.push(v);
       }
    });
    return resArr;
}

```

**方法三：reduce** 先判断数组中元素出现的次数，如果大于1并且结果数组之前无此元素，则将这个元素放到结果数组中

```javascript
// 运行时间：1129ms 占用内存：77776k
function duplicates(arr) {
   let b = [];
   let resArr = [];
   for (let i= 0; i<arr.length; i++){
        b[i] = arr.reduce( (init,curr)=> {
        //如果当前置等于item，该函数值加一
           return curr === arr[i] ? init+1:init;
           },0)
           if (b[i] > 1 && resArr.indexOf(arr[i]) === -1){
               resArr.push(arr[i]);
           }
        }
    return resArr;
}
```