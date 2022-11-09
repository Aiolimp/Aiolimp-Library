## JavaScript实现队列结构（Queue）

### 一、队列简介

队列是是一种受限的线性表，特点为**先进先出**（**FIFO**：first in first out）

- 受限之处在于它只允许在表的**前端**（front）进行删除操作；
- 在表的**后端**（rear）进行插入操作；[![image-20200226171659886](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E9%98%9F%E5%88%97/1.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/队列/1.png)

相当于排队买票，先来的先买票，后来的后买票。

[![image-20200226171449228](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E9%98%9F%E5%88%97/2.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/队列/2.png)

**队列的应用：**

- 打印队列：计算机打印多个文件的时候，需要排队打印；
- 线程队列：当开启多线程时，当新开启的线程所需的资源不足时就先放入线程队列，等待CPU处理；

**队列类的实现：**

队列的实现和栈一样，有两种方案：

- 基于数组实现；
- 基于链表实现；

**队列的常见操作：**

- enqueue（element）：向队列尾部添加一个（或多个）新的项；
- dequeue（）：移除队列的第一（即排在队列最前面的）项，并返回被移除的元素；
- front（）：返回队列中的第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息与Stack类的peek方法非常类似）；
- isEmpty（）：如果队列中不包含任何元素，返回true，否则返回false；
- size（）：返回队列包含的元素个数，与数组的length属性类似；
- toString（）：将队列中的内容，转成字符串形式；

### 二、封装队列类

#### 2.1.代码实现

```javascript
    // 基于数组封装队列类
    function Queue() {
    // 属性
      this.items = []
      
    // 方法
    // 1.enqueue():将元素加入到队列中
    Queue.prototype.enqueue = element => {
      this.items.push(element)
    }

    // 2.dequeue():从队列中删除前端元素
    Queue.prototype.dequeue = () => {
      return this.items.shift()
    }

    // 3.front():查看前端的元素
    Queue.prototype.front = () => {
      return this.items[0]
    }

    // 4.isEmpty:查看队列是否为空
    Queue.prototype.isEmpty = () => {
      return this.items.length == 0;
    }

    // 5.size():查看队列中元素的个数
    Queue.prototype.size = () => {
      return this.items.length
    }

    // 6.toString():将队列中元素以字符串形式输出
    Queue.prototype.toString = () => {
      let resultString = ''
        for (let i of this.items){
          resultString += i + ' '
        }
        return resultString
      }
    }
```

**测试代码：**

```cpp
 	// 创建队列
    let queue = new  Queue()

    // 将元素加入到队列中
    queue.enqueue('a')
    queue.enqueue('b')
    queue.enqueue('c')
    queue.enqueue('d')
    console.log(queue);												//58

    // 从队列中删除元素
    queue.dequeue()
    console.log(queue);												//62
    queue.dequeue()
    console.log(queue);												//64

    //front
    console.log(queue.front());								 		//67
    
    // 验证其他方法
    console.log(queue.isEmpty());								 	//70
    console.log(queue.size());								 		//71
    console.log(queue.toString());								 	//72
```

**测试结果：**

[![image-20200305211334015](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E9%98%9F%E5%88%97/3.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/队列/3.png)

#### 2.2.队列的应用

使用队列实现小游戏：击鼓传花，传入一组数据和设定的数字num，循环遍历数组内元素，遍历到的元素为指定数字num时将该元素删除，直至数组剩下一个元素。

**代码实现：**

```javascript
    // 队列应用：面试题：击鼓传花
    let passGame = (nameList, num) => {
      //1.创建队列结构
      let queue = new Queue()

      //2.将所有人依次加入队列
      // 这是ES6的for循环写法，i相当于nameList[i]
      for(let i of nameList){
        queue.enqueue(i)
      }
      

      // 3.开始数数
     while(queue.size() > 1){//队列中只剩1个人就停止数数
      // 不是num的时候，重新加入队列末尾
      // 是num的时候，将其从队列中删除
      // 3.1.num数字之前的人重新放入队列的末尾(把队列前面删除的加到队列最后)
      for(let i = 0; i< num-1; i++ ){
        queue.enqueue(queue.dequeue())
      }
      // 3.2.num对应这个人，直接从队列中删除
      /*
        思路是这样的，由于队列没有像数组一样的下标值不能直接取到某一元素，所以采用，把num前面的num-1个元素先删除后添加到队列末尾，这样第num个元素就排到了队列的最前面，可以直接使用dequeue方法进行删除
      */
      queue.dequeue()
     }

      //4.获取剩下的那个人
      console.log(queue.size());									//104
      let endName = queue.front()
      console.log('最终剩下的人：' + endName);						   //106	
      
      return nameList.indexOf(endName);
    }

    //5.测试击鼓传花
    let names = ['lily', 'lucy', 'Tom', 'Lilei', 'Tony']
    console.log(passGame(names, 3));								//113
```

**测试结果：**

[![image-20200305212021550](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E9%98%9F%E5%88%97/4.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/队列/4.png)

### 三、优先队列

优先级队列主要考虑的问题为：

- 每个元素不再只是一个数据，还包含数据的优先级；
- 在添加数据过程中，根据优先级放入到正确位置；

#### 3.1.优先级队列的实现

**代码实现：**

```kotlin
    // 封装优先级队列
    function PriorityQueue() {

      //内部类：在类里面再封装一个类;表示带优先级的数据
      function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
      } 

      // 封装属性
      this.items = []

      // 1.实现按照优先级插入方法
      PriorityQueue.prototype.enqueue = (element, priority) => {
        // 1.1.创建QueueElement对象
        let queueElement = new QueueElement(element, priority)

        // 1.2.判断队列是否为空
        if(this.items.length == 0){
          this.items.push(queueElement)
        }else{
          // 定义一个变量记录是否成功添加了新元素
          let added = false
          for(let i of this.items){
            // 让新插入的元素与原有元素进行优先级比较(priority越小，优先级越大)
            if(queueElement.priority < i.priority){
              this.items.splice(i, 0, queueElement)
              added = true
              // 新元素已经找到插入位置了可以使用break停止循环
              break
            }
          }
          // 新元素没有成功插入，就把它放在队列的最前面
          if(!added){
            this.items.push(queueElement)
          }
        }
      }

      // 2.dequeue():从队列中删除前端元素
      PriorityQueue.prototype.dequeue = () => {
        return this.items.shift()
      }

      // 3.front():查看前端的元素
      PriorityQueue.prototype.front = () => {
        return this.items[0]
      }

      // 4.isEmpty():查看队列是否为空
      PriorityQueue.prototype.isEmpty = () => {
        return this.items.length == 0;
      }

      // 5.size():查看队列中元素的个数
      PriorityQueue.prototype.size = () => {
        return this.items.length
      }

      // 6.toString():以字符串形式输出队列中的元素
      PriorityQueue.prototype.toString = () => {
        let resultString = ''
          for (let i of this.items){
            resultString += i.element + '-' + i.priority + ' '
          }
          return resultString
        }
    }
```

**测试代码：**

```javascript
    // 测试代码
    let pq = new PriorityQueue();
    pq.enqueue('Tom',111);
    pq.enqueue('Hellen',200);
    pq.enqueue('Mary',30);
    pq.enqueue('Gogo',27);
    // 打印修改过后的优先队列对象
    console.log(pq);
```

**测试结果：**

[![image-20200226223314535](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E9%98%9F%E5%88%97/5.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/队列/5.png)

#### 3.2.注意点

**关于数组方法splice用法**：

- splice（1，0，'Tom'）：表示在索引为1的元素前面插入元素’Tom‘（也可以理解为从索引为1的元素开始删除，删除0个元素，再在索引为1的元素前面添加元素'Tom'）；
- splice（1，1，'Tom'）：表示从索引为1的元素开始删除（包括索引为1的元素），共删除1个元素，并添加元素'Tom'。即把索引为1的元素替换为元素'Tom'。

**数组的push方法在数组、栈和队列中的形式：**

- **数组**：在数组[0，1，2]中，pop(3)，结果为[0，1，2，3]；
- **栈**：执行pop(0)，pop(1)，pop(2)，pop(3)，从栈底到栈顶的元素分别为：0，1，2，3；如果看成数组，可写为[0，1，2，3]，但是索引为3的元素3其实是栈顶元素；所以说栈的push方法是向栈顶添加元素（但在数组的视角下为向数组尾部添加元素）；
- **队列**：enqueue方法可以由数组的push方法实现，与数组相同，相当于在数组尾部添加元素。

![image-20200226231025462](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E9%98%9F%E5%88%97/6.png)