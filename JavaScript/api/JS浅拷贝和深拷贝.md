## JS中的浅拷贝和深拷贝

**JS中的深拷贝和浅拷贝**
如何区分深拷贝与浅拷贝，简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝如果B没变，那就是深拷贝。

### 浅拷贝

```js
let a=[0,1,2,3,4],
    b=a;
console.log(a===b);
a[0]=1;
console.log(a,b);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200923165832394.png#pic_center)

此时，修改数组a，数组b也跟着变了。

#### 1. 手动实现

```js
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? []: {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
          cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

#### 2. Object.assign

但是需要注意的是，Object.assgin() 拷贝的是对象的属性的引用，而不是对象本身。

```js
let obj = { name: 'sy', age: 18 };
const obj2 = Object.assign({}, obj, {name: 'sss'});
console.log(obj2);//{ name: 'sss', age: 18 }
```

#### 3. concat浅拷贝数组

```js
let arr = [1, 2, 3];
let newArr = arr.concat();
newArr[1] = 100;
console.log(arr);//[ 1, 2, 3 ]
```

#### 4. slice浅拷贝

```js
let arr = [1, 2, {val: 4}];
let newArr = arr.slice();
newArr[2].val = 1000;

console.log(arr);//[ 1, 2, { val: 1000 } ]
```



#### 5. ...展开运算符

```js
let arr = [1, 2, 3];
let newArr = [...arr];//跟arr.slice()是一样的效果
```

### 深拷贝

#### 1.用递归去复制所有层级属性

```js
function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}    
let a=[1,2,3,4],
    b=deepClone(a);
a[0]=2;
console.log(a,b);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200923170144196.png#pic_center)

#### 2.利用JSON.parse(JSON.stringify())

```js
function deepCopy(o) {
    return JSON.parse(JSON.stringify(o))
}

var c = {
    age: 1,
    name: undefined,
    sex: null,
    tel: /^1[34578]\d{9}$/,
    say: () => {
        console.log('hahha')
    }
}
// { age: 1, sex: null, tel: {} }
```

**注意**：这种拷贝方法不可以拷贝一些特殊的属性（例如正则表达式，undefine，function）

