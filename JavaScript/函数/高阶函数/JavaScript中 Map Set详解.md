## JavaScript中 Map Set详解

#### 1. Map 和 Set

**1.1 Map**
**Map: 一组键值对的结构，具有极快的查找速度。**

举个例子，假设要根据同学的名字查找对应的成绩，如果用Array实现，需要两个Array：

```javascript
var names = ['Michael', 'Bob', 'Tracy'];
var scores = [95, 75, 85];
```

给定一个名字，要查找对应的成绩，就先要在 names 中找到对应的位置，再从 scores 取出对应的成绩，Array越长，耗时越长。

如果用Map实现，只需要一个“名字”-“成绩”的对照表，直接根据名字查找成绩，无论这个表有多大，查找速度都不会变慢。
用 JavaScript 写一个 Map 如下：

```javascript
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.get('Michael'); // 95
```

初始化 Map 需要一个二维数组，或者直接初始化一个空 Map。
Map 具有以下方法：

```javascript
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
```

由于一个 key 只能对应一个 value，所以，多次对一个 key 放入 value，后面的值会把前面的值冲掉：

```javascript
var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88
```

**1.2 Set**
Set 和 Map 类似，也是一组 key 的集合，但不存储 value。
由于 key 不能重复，所以在 Set 中，没有重复的 key。

要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set：

```javascript
var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
```

重复元素在 Set 中自动被过滤：

```javascript
var s = new Set([1, 2, 3, 3, '3']);
s; // Set {1, 2, 3, "3"}
```

通过 add(key) 方法可以添加元素到 Set 中，可以重复添加，但不会有效果：

```javascript
s.add(4);
s; // Set {1, 2, 3, 4}
s.add(4);
s; // 仍然是 Set {1, 2, 3, 4}
```

通过delete(key)方法可以删除元素：

```javascript
var s = new Set([1, 2, 3]);
s; // Set {1, 2, 3}
s.delete(3);
s; // Set {1, 2}
```

#### 2. 属性和方法

定义：键/值对的集合。
语法：mapObj = new Map()
备注：集合中的键和值可以是任何类型。如果使用现有密钥向集合添加值，则新值会替换旧值。

| Map 对象属性     | 描述                   |
| ---------------- | ---------------------- |
| 构造函数         | 指定创建映射的函数     |
| Prototype — 原型 | 为映射返回对原型的引用 |
| 构造函数         | 返回映射中的元素数     |

| Map 对象方法 | 描述                              |
| ------------ | --------------------------------- |
| clear        | 从映射中移除所有元素              |
| delete       | 从映射中移除指定的元素            |
| forEach      | 对映射中的每个元素执行指定操作    |
| get          | 返回映射中的指定元素              |
| has          | 如果映射包含指定元素，则返回 true |
| toString     | 返回映射的字符串表示形式          |
| set          | 添加一个新建元素到映射            |
| valueOf      | 返回指定对象的原始值              |

eg:

```javascript
// 如何将成员添加到 Map，然后检索它们
var m = new Map();
m.set(1, "black");
m.set(2, "red");
m.set("colors", 2);
m.set({x:1}, 3);

m.forEach(function (item, key, mapObj) {
    document.write(item.toString() + "<br />");
});

document.write("<br />");
document.write(m.get(2));

// Output:
// black
// red
// 2
// 3
//
// red
```

#### 3. Set 和 Map 数据结构

Set 和 Map 主要的应用场景: **数组去重和数据存储**
**Set 是一种叫做集合的数据结构，Map 是一种叫做字典的数据结构**

**3.1 集合 Set**

1. 集合是由一组无序且唯一的项组成的，可以想象成集合是一个既没有重复元素，也没有顺序概念的数组;
2. ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值;
3. Set 本身是一个构造函数，用来生成 Set 数据结构;

```javascript
const s = new Set();
 
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
 
for (let i of s) {
  console.log(i);   // 2 3 5 4
}
 
// 去除数组的重复成员
let array = [1,2,1,4,5,3];
[...new Set(array)]     // [1, 2, 4, 5, 3]
```

| 属性 | 描述                     |
| ---- | ------------------------ |
| size | 返回集合所包含元素的数量 |

**3.1.1 操作方法**

| 操作方法      | 描述                                     |
| ------------- | ---------------------------------------- |
| add(value)    | 向集合添加一个新的项                     |
| delete(value) | 从集合中移除一个值                       |
| has(value)    | 如果值在集合中存在，返回 true,否则 false |
| clear()       | 移除集合里所有的项                       |

**创建一个集合**

```javascript
function Set(arr = []) {    // 可以传入数组
    let items = {};
    this.size = 0;  // 记录集合中成员的数量
}
 
module.exports = Set;
```

这里用 {} 对象来表示集合，也是因为对象不允许一个键指向两个不同的属性，保证了集合里的元素都是唯一的;

**has方法**
首先要实现的是 has 方法，因为在 add 和 delete 等其他方法中都会被调用

```javascript
function Set() {
    let items = {};
    this.size = 0;
    
    // has(val)方法
    this.has = function(val) {
        // 对象都有hasOwnProperty方法，判断是否拥有特定属性
        return items.hasOwnProperty(val);  
    };
}
```

**add方法**

```javascript
// add(val)方法
this.add = function(val) {
  if (!this.has(val)) {
    items[val] = val;
    this.size ++;    // 累加集合成员数量
    return true;
  }
  return false;
};
```

对于给定的 val，可以检测是否存在于集合中

- 如果不存在，就添加到集合中，返回 true;
- 如果存在，就直接返回 false，不做任何操作;

**delete 和 clear 方法**

```javascript
// delete(val)方法
this.delete = function(val) {
  if (this.has(val)) {
    delete items[val];  // 将items对象上的属性删掉
    this.size --;
    return true;
  }
  return false;
};

// clear方法
this.clear = function() {
  items = {};     // 直接将集合赋一个空对象即可
  this.size = 0;
};
```

在 delete 方法中，判断 val 是否存在于集合中，如果存在就直接从集合中删掉，返回 true;

**3.1.2 遍历方法**

| 遍历方法  | 描述                                   |
| --------- | -------------------------------------- |
| keys()    | 返回一个包含集合中所有键的数组         |
| values()  | 返回一个包含集合中所有值的数组         |
| entries   | 返回一个包含集合中所有键值对的数组     |
| forEach() | 用于对集合成员执行某种操作，没有返回值 |

**keys、values 方法**

```javascript
// keys()方法
this.keys = function() {
  return Object.keys(items);  // 返回遍历集合的所有键名的数组
};

// values()方法
this.values = function() {
  return Object.values(items);  // 返回遍历集合的所有键值的数组
};
```

eg:

```javascript
// set.js
const Set = require('./Set.js');    // 导入写好的Set类
let set = new Set();
set.add(1);
set.add(3);
set.add(2);
console.log(set.keys());    // [ '1', '2', '3' ]
console.log(set.values());  // [ 1, 2, 3 ]
```

这里我们看到和ES6中的 Set 有点区别，因为 Object 的这几个方法都是按照数值大小，从小到大遍历的数组，所以大家知道这一点比较好，具体实现还是有些不同的，哈哈.。

**forEach方法**

ES6 中 Set 结构的实例上带的 forEach 方法，其实和数组的 forEach 方法很相似，只不过Set结构的键名就是键值，所以第一个参数与第二个参数的值永远都是一样的。

下面就按照实现数组的 forEach 方法，我们来完成 Set 的 forEach 方法。

```javascript
// forEach(fn, context)方法
this.forEach = function(fn, context = this) {
  for (let i = 0; i < this.size; i++) {
    let item = Object.keys(items)[i];
    fn.call(context, item, item, items);     
  }
};
```

eg:

```javascript
// set.js
const Set = require('./Set.js');
let set = new Set();
set.add(1);
set.add(4);
set.add('3');
set.forEach((value, key) => console.log(key + ' : ' + value));  // 1:1, 3:3, 4:4
let arr = set.values();   // [ 1, 3, 4 ]
arr = new Set(arr.map(x => x * 2)).values();
console.log(arr);  // [ 2, 6, 8 ]
```

基本上实现了 Set 结构的方法，不过，发现一个问题，那就是每次添加一个元素都要 add 这样写起来确实好麻烦，
Set是可以接收一个数组作为参数的，那么我们把这个也实现一下

```javascript
function Set(arr = []) {    // 传入接受的数组，如果没有传指定一个空数组做为初始值
    let items = {};
    this.size = 0;
    // has方法
    this.has = function (val) {
        return items.hasOwnProperty(val);
    };
    // add方法
    this.add = function (val) {
        // 如果没有存在items里面就可以直接写入
        if (!this.has(val)) {
            items[val] = val;
            this.size++;
            return true;
        }
        return false;
    };
    arr.forEach((val, i) => {   // 遍历传入的数组
        this.add(val);          // 将数组里每一项值添加到集合中
    });
    // 省略...
}
```

再来看看现在能不能支持传入的数组了

```javascript
// 间接使用 map 和 filter
const Set = require('./Set.js');
let arr = new Set([1, 2, 3]).values();
m = new Set(arr.map(x => x * 2));
f = new Set(arr.filter(x => x>1));
console.log(m.values());    // [ 2, 4, 6 ]
console.log(f.values());    // [ 2, 3 ]
 
// 数组去重
let arr2 = new Set([3, 5, 2, 1, 2, 5, 5]).values();
console.log(arr2);  // [ 1, 2, 3, 5 ]
```

现在我们有了一个和 ES6 中非常类似的 Set 类实现。如前所述，也可以用数组替代对象，存储元素。
喜欢动手的同学们，之后也可以去尝试一下。

**3.1.3 union并集、intersect交集、difference差集**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201123163146424.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1pZUzEwMDAw,size_16,color_FFFFFF,t_70#pic_center)

```javascript
// 并集
this.union = function (other) {
  let union = new Set();
  let values = this.values();
  for (let i = 0; i < values.length; i++) {
    union.add(values[i]);
  }
  values = other.values();    // 将values重新赋值为新的集合
  for (let i = 0; i < values.length; i++) {
    union.add(values[i]);
  }
  return union;
};

// 交集
this.intersect = function (other) {
  let intersect = new Set();
  let values = this.values();
  for (let i = 0; i < values.length; i++) {
    if (other.has(values[i])) {     // 查看是否也存在于other中
      intersect.add(values[i]);   // 存在的话就像intersect中添加元素
    }
  }
  return intersect;
};

// 差集
this.difference = function (other) {
  let difference = new Set();
  let values = this.values();
  for (let i = 0; i < values.length; i++) {
    if (!other.has(values[i])) {    // 将不存在于other集合中的添加到新的集合中
      difference.add(values[i]);
    }
  }
  return difference;
};
```

**3.1.4 完整实现代码**

```javascript
function Set(arr = []) {
  let items = {};
  this.size = 0;

  // has方法
  this.has = function (val) {
    return items.hasOwnProperty(val);
  };

  // add方法
  this.add = function (val) {
    // 如果没有存在items里面就可以直接写入
    if (!this.has(val)) {
      items[val] = val;
      this.size++;
      return true;
    }
    return false;
  };
  arr.forEach((val, i) => {
    this.add(val);
  });

  // delete方法
  this.delete = function (val) {
    if (this.has(val)) {
      delete items[val];  // 将items对象上的属性删掉
      this.size--;
      return true;
    }
    return false;
  };

  // clear方法
  this.clear = function () {
    items = {};
    this.size = 0;
  };

  // keys方法
  this.keys = function () {
    return Object.keys(items);
  };

  // values方法
  this.values = function () {
    return Object.values(items);
  }

  // forEach方法
  this.forEach = function (fn, context = this) {
    for (let i = 0; i < this.size; i++) {
      let item = Object.keys(items)[i];
      fn.call(context, item, item, items);
    }
  }

  // 并集
  this.union = function (other) {
    let union = new Set();
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      union.add(values[i]);
    }
    values = other.values();    // 将values重新赋值为新的集合
    for (let i = 0; i < values.length; i++) {
      union.add(values[i]);
    }
    return union;
  };

  // 交集
  this.intersect = function (other) {
    let intersect = new Set();
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (other.has(values[i])) {
        intersect.add(values[i]);
      }
    }
    return intersect;
  };

  // 差集
  this.difference = function (other) {
    let difference = new Set();
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (!other.has(values[i])) {
        difference.add(values[i]);
      }
    }
    return difference;
  };

  // 子集
  this.subset = function(other) {
    if (this.size > other.size) {
      return false;
    } else {
      let values = this.values();
      for (let i = 0; i < values.length; i++) {
        if (!other.has(values[i])) {
          return false;
        }
      }
      return true;
    }
  };
}
 
module.exports = Set;
```

eg:

```javascript
const Set = require('./Set.js');
let set = new Set([2, 1, 3]);
console.log(set.keys());    // [ '1', '2', '3' ]
console.log(set.values());  // [ 1, 2, 3 ]
console.log(set.size);      // 3
set.delete(1);
console.log(set.values());  // [ 2, 3 ]
set.clear();
console.log(set.size);      // 0
 
// 并集
let a = [1, 2, 3];
let b = new Set([4, 3, 2]);
let union = new Set(a).union(b).values();
console.log(union);     // [ 1, 2, 3, 4 ]
 
// 交集
let c = new Set([4, 3, 2]);
let intersect = new Set([1,2,3]).intersect(c).values();
console.log(intersect); // [ 2, 3 ]
 
// 差集
let d = new Set([4, 3, 2]);
let difference = new Set([1,2,3]).difference(d).values();
// [1,2,3]和[4,3,2]的差集是1
console.log(difference);    // [ 1 ]
```

目前为止我们用集合这种数据结构就实现了类似ES6中Set类，上面的使用方法也基本一样，大家可以之后有时间的话动手去敲一敲看一看，走过路过不能错过。

**3.2 字典 Map**
集合、字典区别：

- 共同点：集合、字典可以存储不重复的值；
- 不同点：集合是以 [值，值] 的形式存储元素，字典是以 [键，值] 的形式存储；

所以这一下让我们明白了，Map 其实的主要用途也是用于存储数据的，相比于 Object 只提供“字符串—值”的对应，Map提供了“值—值”的对应。
也就是说如果你需要“键值对”的数据结构，Map比Object更合适。

```javascript
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content')
m.get(o) // "content"
 
m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

| 属性 | 描述                     |
| ---- | ------------------------ |
| size | 返回字典所包含元素的数量 |

**3.2.1 操作方法**

| 操作方法      | 描述                                 |
| ------------- | ------------------------------------ |
| set(key, val) | 向字典中添加新元素                   |
| get(key)      | 通过键值查找特定的数值并返回         |
| has(key)      | 如果键存在字典中返回 true,否则 false |
| delete(key)   | 通过键值从字典中移除对应的数据       |
| clear()       | 将这个字典中的所有元素删除           |

**创建一个字典**

```javascript
function Map() {
    let items = {};
} 
module.exports = Map;
```

**has方法**
首当其冲的当然是 has 了，因为在 set 和 get 里都会用到，实现思路和之前写的集合也很类似

```javascript
function Map() {
    let items = {};
    // has(key)方法
    this.has = function(val) {
        return items.hasOwnProperty(val);
    };
}
```

**set 和 get 方法**

```javascript
// set(key, val)方法
// set相同key时，后面声明的会覆盖前面
// 如： new Map().set({}, 'a')
this.set = function(key, val) {
  items[key] = val;   
};
// get(key)方法
this.get = function(key) {
  // 判断是否有key，如果有的话直接返回对应的值
  // 如果读取一个未知的键，则返回undefined
  return this.has(key) ? items[key] : undefined;
};
```

**delete 和 clear 方法**

```javascript
// delete(key)方法
this.delete = function(key) {
  if (this.has(key)) {    // 如果有key值
    delete items[key];  // 直接删掉items上对应的属性
    this.size--;        // 让size总数减1
    return true;
  }
  return false;
};

// clear()方法
this.clear = function() {
  items = {};
  this.size = 0;
};
```

**3.2.2 遍历方法**

| 遍历方法  | 描述                                 |
| --------- | ------------------------------------ |
| keys()    | 将字典中包含的所有键名以数组形式返回 |
| values()  | 将字典中包含的所有数值以数组形式返回 |
| forEach() | 遍历字典的所有成员                   |

```javascript
// keys()方法
this.keys = function() {
  return Object.keys(items);
};

// values()方法
this.values = function() {
  return Object.values(items);  
};

// forEach(fn, context)方法
this.forEach = function(fn, context = this) {
  for (let i = 0; i < this.size; i++) {
    let key = Object.keys(items)[i];
    let value = Object.values(items)[i];
    fn.call(context, value, key, items);
  }
};
```

3.2.3 Map 完整代码

```javascript
function Map() {
  let items = {};
  this.size = 0;
 
  // has方法
  this.has = function(val) {
    return items.hasOwnProperty(val);
  };

  // set(key, val)方法
  this.set = function(key, val) {
    items[key] = val;
    this.size++;
  };

  // get(key)方法
  this.get = function(key) {
    return this.has(key) ? items[key] : undefined;
  };

  // delete(key)方法
  this.delete = function(key) {
    if (this.has(key)) {
      delete items[key];
      this.size--;
      return true;
    }
    return false;
  };

  // clear()方法
  this.clear = function() {
    items = {};
    this.size = 0;
  };

  // keys()方法
  this.keys = function() {
    return Object.keys(items);
  };

  // values()方法
  this.values = function() {
    return Object.values(items);
  };

  // forEach(fn, context)方法
  this.forEach = function(fn, context = this) {
    for (let i = 0; i < this.size; i++) {
      let key = Object.keys(items)[i];
      let value = Object.values(items)[i];
      fn.call(context, value, key, items);
    }
  };
}
 
module.exports = Map;
```

eg:

```javascript
// map.js
// 使用Map类
const Map = require('./Map.js');
let m = new Map();
m.set('Jay', 'Jay的Chou');
m.set(true, '真的');
console.log(m.has('Chou'));  // false
console.log(m.size);        // 2
console.log(m.keys());      // [ 'Jay', 'true' ]
console.log(m.values());    // [ 'Jay的Chou', '真的' ]
console.log(m.get('jay'));  // undefined
    
m.delete(true);
console.log(m.keys());      // [ 'Jay' ]
console.log(m.values());    // [ 'Jay的Chou' ]
```

#### 4. Array.from()

ES6 为 Array 增加了 from函数用来将其他对象转换成数组。
当然，其他对象也是有要求，也不是所有的，可以将两种对象转换成数组。
1.部署了Iterator接口的对象，比如：Set，Map，Array。
2.类数组对象，什么叫类数组对象，就是一个对象必须有length属性，没有length，转出来的就是空数组。

**转换 map**

将 Map 对象的键值对转换成一个一维数组。
实际上转换出来的数组元素的序列是 key1,value1,key2,value2,key3,value3…

```javascript
const map1 = new Map();
map1.set('k1', 1);
map1.set('k2', 2);
map1.set('k3', 3);
console.log(Array.from(map1)) // [['k1',1],['k2',2],['k3',3]]
```

**转换 set**
将 Set 对象的元素转换成一个数组

```javascript
const set1 = new Set();
set1.add(1).add(2).add(3)
console.log(Array.from(set1)) // [1,2,3]
```

**转换字符串**
可以把 ascii 的字符串拆解成一个数据，也可以准确的将 unicode 字符串拆解成数组。

```javascript
console.log(Array.from('hello world')); // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
console.log(Array.from('\u767d\u8272\u7684\u6d77')); // ["白", "色", "的", "海"]
```

**类数组对象**

一个类数组对象必须要有length，他们的元素属性名必须是数值或者可以转换成数值的字符。
注意：属性名代表了数组的索引号，如果没有这个索引号，转出来的数组中对应的元素就为空。

```javascript
console.log(Array.from({0: '0',1: '1',3: '3',length:4})) //  ["0", "1", undefined, "3"]
```

如果对象不带 length 属性，那么转出来就是空数组

```javascript
console.log(Array.from({0: 0,1: 1})) // []
```

对象的属性名不能转换成索引号时

```javascript
console.log(Array.from({a: '1',b: '2',length:2})) // []
```

**定义**
Array.from 可以接受三个参数

```javascript
Array.from(arrayLike[, mapFn[, thisArg]])

arrayLike：被转换的的对象
mapFn：map函数
thisArg：map函数中this指向的对象


第二个参数: map函数
用来对转换中，每一个元素进行加工，并将加工后的结果作为结果数组的元素值
console.log(Array.from([1, 2, 3, 4, 5], (n) => n + 1)) // [2, 3, 4, 5, 6]

第三个参数: map函数中this指向的对象
该参数是非常有用的，我们可以将被处理的数据和处理对象分离，将各种不同的处理数据的方法封装到不同的的对象中去，
处理方法采用相同的名字。
在调用Array.from对数据对象进行转换时，可以将不同的处理对象按实际情况进行注入，以得到不同的结果，适合解耦。
这种做法是模板设计模式的应用，有点类似于依赖注入。

let diObj = {
  handle: function(n){
    return n + 2
  }
}

console.log(
  Array.from(
    [1, 2, 3, 4, 5], 
    function (x){
      return this.handle(x)
    }, 
    diObj
  )
) // [3, 4, 5, 6, 7]
```