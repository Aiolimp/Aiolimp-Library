## JavaScript实现单向链表

### 一、单向链表简介

链表和数组一样，可以用于**存储一系列的元素**，但是链表和数组的**实现机制完全不同**。链表的每个元素由一个存储**元素本身的节点**和一个**指向下一个元素的引用**（有的语言称为指针或连接）组成。类似于火车头，一节车厢载着乘客（数据），通过节点连接另一节车厢。

[![image-20200227110656733](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/1.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/1.png)



[![image-20200227110626750](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/2.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/2.png)





[![image-20200226233942344](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/3.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/3.png)

- head属性指向链表的第一个节点；
- 链表中的最后一个节点指向null；
- 当链表中一个节点也没有的时候，head直接指向null；

**数组存在的缺点：**

- 数组的创建通常需要申请一段**连续的内存空间**（一整块内存），并且大小是固定的。所以当原数组**不能满足容量需求**时，需要**扩容**（一般情况下是申请一个更大的数组，比如2倍，然后将原数组中的元素复制过去）。
- 在数组的开头或中间位置插入数据的成本很高，需要进行大量元素的位移。

**链表的优势：**

- 链表中的元素在内存中**不必是连续的空间**，可以充分利用计算机的内存，实现灵活的**内存动态管理**。
- 链表不必在创建时就**确定大小**，并且大小可以**无限地延伸**下去。
- 链表在**插入和删除**数据时，**时间复杂度**可以达到O(1)，相对数组效率高很多。

**链表的缺点：**

- 链表访问任何一个位置的元素时，都需要**从头开始访问**（无法跳过第一个元素访问任何一个元素）。
- 无法通过下标值直接访问元素，需要从头开始一个个访问，直到找到对应的元素。
- 虽然可以轻松地到达**下一个节点**，但是回到**前一个节点**是很难的。

**链表中的常见操作：**

- append（element）：向链表尾部添加一个新的项；
- insert（position，element）：向链表的特定位置插入一个新的项；
- get（position）：获取对应位置的元素；
- indexOf（element）：返回元素在链表中的索引。如果链表中没有该元素就返回-1；
- update（position，element）：修改某个位置的元素；
- removeAt（position）：从链表的特定位置移除一项；
- remove（element）：从链表中移除一项；
- isEmpty（）：如果链表中不包含任何元素，返回trun，如果链表长度大于0则返回false；
- size（）：返回链表包含的元素个数，与数组的length属性类似；
- toString（）：由于链表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值；

首先需要弄清楚：下文中的position指的是两个节点之间，并且与index的关系如下图所示：

[![image-20200306101534508](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/4.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/4.png)



position的值一般表示position所指位置的下一个节点。当position的值与index的值相等时，比如position = index = 1，那么它们都表示Node2。

### 二、封装单向链表类

#### 2.0.创建单向链表类

先创建单向链表类Linklist，并添加基本属性，再实现单向链表的常用方法：

```kotlin
    // 封装单向链表类
    function LinkList(){
      // 封装一个内部类：节点类
      function Node(data){
        this.data = data;
        this.next = null;
      }

      // 属性
      // 属性head指向链表的第一个节点
      this.head = null;
      this.length = 0;
      }
```

#### 2.1.append(element)

**代码实现：**

```kotlin
      // 一.实现append方法
      LinkList.prototype.append = data => {
        //1.创建新节点
        let newNode = new Node(data)

        //2.添加新节点
        //情况1：只有一个节点时候
        if(this.length == 0){
          this.head = newNode
        //情况2：节点数大于1，在链表的最后添加新节点  
        }else {              
          //让变量current指向第一个节点
          let current = this.head
          //当current.next(下一个节点不为空)不为空时，一直循环，直到current指向最后一个节点
          while (current.next){
            current = current.next
          }
          // 最后节点的next指向新的节点
          current.next = newNode
        }
        //3.添加完新结点之后length+1
        this.length += 1
      }
```

**过程详解：**

- 首先让current指向第一个节点：

[![image-20200227145315369](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/5.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/5.png)



- 通过while循环使current指向最后一个节点，最后通过current.next = newNode，让最后一个节点指向新节点newNode：

[![image-20200227145453380](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/6.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/6.png)



**测试代码：**

```go
    //测试代码
    //1.创建LinkList
    let list = new LinkList()
    
    //2.测试append方法
    list.append('aaa')
    list.append('bbb')
    list.append('ccc')
    console.log(list);  
```

**测试结果：**

[![image-20200305234828061](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/7.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/7.png)



#### 2.2.toString()

**代码实现：**

```javascript
      // 实现toString方法
      LinkList.prototype.toString = () => {
        // 1.定义变量
        let current = this.head
        let listString = ""

        // 2.循环获取一个个的节点
        while(current){ 
          listString += current.data + " "
          current = current.next//千万不要忘了拼接完一个节点数据之后，让current指向下一个节点
        }
        return  listString
      }
```

**测试代码：**

```go
    //测试代码
    //1.创建LinkList
    let list = new LinkList()
    
    //2.插入数据
    list.append('aaa')
    list.append('bbb')
    list.append('ccc')
    
    //3.测试toString方法
    console.log(list.toString());
```

**测试结果：**

[![image-20200305235437934](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/8.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/8.png)



#### 2.3.insert(position,element)

**代码实现：**

```kotlin
      // 实现insert方法
      LinkList.prototype.insert = (position, data) => {
      //理解positon的含义：position=0表示新界点插入后要成为第1个节点，position=2表示新界点插入后要成为第3个节点
        //1.对position进行越界判断:要求传入的position不能是负数且不能超过LinkList的length
        if(position < 0 || position > this.length){
          return false
        }
        //2.根据data创建newNode
        let newNode = new Node(data)

        //3.插入新节点
        //情况1：插入位置position=0
        if(position == 0){
          // 让新节点指向第一个节点
          newNode.next = this.head
          // 让head指向新节点
          this.head = newNode
        //情况2：插入位置position>0(该情况包含position=length)
        } else{
          let index = 0
          let previous = null
          let current = this.head
          //步骤1：通过while循环使变量current指向position位置的后一个节点(注意while循环的写法)
          while(index++ < position){
          //步骤2：在current指向下一个节点之前，让previous指向current当前指向的节点
            previous = current
            current = current.next
          }
          // 步骤3：通过变量current(此时current已经指向position位置的后一个节点)，使newNode指向position位置的后一个节点
          newNode.next = current
          //步骤4：通过变量previous，使position位置的前一个节点指向newNode
          previous.next = newNode
          /*
            启示：
            1.我们无法直接操作链表中的节点，但是可以通过变量指向这些节点，以此间接地操作节点(替身使者)；
            比如current指向节点3，想要节点3指向节点4只需要：current.next = 4即可。
            2.两个节点间是双向的，想要节点2的前一个节点为节点1，可以通过：1.next=2，来实现；
          */
        }
        //4.新节点插入后要length+1
        this.length += 1;

        return true
      }
```

**过程详解：**

inset方法实现的过程：根据插入节点位置的不同可分为多种情况：

- **情况1：position = 0**：

通过： newNode.next = this.head，建立连接1；

通过： this.head = newNode，建立连接2；（不能先建立连接2，否则this.head不再指向Node1）

[![image-20200306103312580](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/9.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/9.png)



- **情况2：position > 0**：

首先定义两个变量previous和curent分别指向需要插入位置pos = X的前一个节点和后一个节点；

然后，通过：newNode.next = current，改变指向3；

最后，通过：previous.next = newNode，改变指向4；

[![image-20200306103541674](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/10.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/10.png)



- **情况2的特殊情形：position = length**：

情况2也包含了pos = length的情况，该情况下current和newNode.next都指向null；建立连接3和连接4的方式与情况2相同。

[![image-20200306103646576](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/11.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/11.png)



**测试代码：**

```go
    //测试代码
    //1.创建LinkList
    let list = new LinkList()
    
    //2.插入数据
    list.append('aaa')
    list.append('bbb')
    list.append('ccc')
    
    //3.测试insert方法
    list.insert(0, '在链表最前面插入节点');
    list.insert(2, '在链表中第二个节点后插入节点');
    list.insert(5, '在链表最后插入节点');
    alert(list);
    console.log(list);
```

**测试结果：**

[![image-20200305235710063](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/12.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/12.png)



[![image-20200305235756962](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/13.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/13.png)



#### 2.4.get(position)

**代码实现：**

```kotlin
      //实现get方法
      LinkList.prototype.get = (position) => {
        //1.越界判断
        // 当position = length时，取到的是null所以0 =< position < length
        if(position < 0 || position >= this.length){
          return null
        }
        //2.获取指定的positon位置的后一个节点的data
        //同样使用一个变量间接操作节点
        let current = this.head
        let index = 0
        while(index++ < position){
          current = current.next
        }
        return current.data
      }
```

**过程详解：**

get方法的实现过程：以获取position = 2为例，如下图所示：

- 首先使current指向第一个节点，此时index=0；

[![image-20200227164308939](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/14.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/14.png)



- 通过while循环使current循环指向下一个节点，注意循环终止的条件index++ < position，即当index=position时停止循环，此时循环了1次，current指向第二个节点(Node2)，最后通过current.data返回Node2节点的数据；

[![image-20200227164351066](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/15.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/15.png)



**测试代码：**

```csharp
	//测试代码
    //1.创建LinkList
    let list = new LinkList()
    
    //2.插入数据
    list.append('aaa')
    list.append('bbb')
    list.append('ccc')	

	//3.测试get方法
    console.log(list.get(0));
    console.log(list.get(1));
```

**测试结果：**

[![image-20200306000211073](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/16.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/16.png)



#### 2.5.indexOf(element)

**代码实现：**

```kotlin
      //实现indexOf方法
      LinkList.prototype.indexOf = data => {
        //1.定义变量
        let current = this.head
        let index = 0

        //2.开始查找:只要current不指向null就一直循环
        while(current){
          if(current.data == data){
            return index
          }
          current = current.next
          index += 1
        } 

        //3.遍历完链表没有找到，返回-1
        return -1
      }
```

**过程详解：**

indexOf方法的实现过程：

- 使用变量current记录当前指向的节点，使用变量index记录当前节点的索引值（注意index = node数-1）：

[![image-20200227155230599](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/17.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/17.png)



**测试代码：**

```go
	//测试代码
    //1.创建LinkList
    let list = new LinkList()
    
    //2.插入数据
    list.append('aaa')
    list.append('bbb')
    list.append('ccc')	
    
    //3.测试indexOf方法
    console.log(list.indexOf('aaa'));
    console.log(list.indexOf('ccc'));
```

**测试结果：**

[![image-20200306000424189](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/18.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/18.png)



#### 2.6.update(position,element)

**代码实现：**

```javascript
      //实现update方法
      LinkList.prototype.update = (position, newData) => {
        //1.越界判断
        //因为被修改的节点不能为null，所以position不能等于length
        if(position < 0 || position >= this.length){
          return false
        }
        //2.查找正确的节点
        let current = this.head
        let index = 0
        while(index++ < position){
          current = current.next
        }
        //3.将position位置的后一个节点的data修改成newData
        current.data = newData
        //返回true表示修改成功
        return true
      }
```

**测试代码：**

```go
	//测试代码
    //1.创建LinkList
    let list = new LinkList()
    
    //2.插入数据
    list.append('aaa')
    list.append('bbb')
    list.append('ccc')	
    
    //3.测试update方法
    list.update(0, '修改第一个节点')
    list.update(1, '修改第二个节点')
    console.log(list);
    console.log(list.update(3, '能修改么'));
```

**测试结果：**

[![image-20200306000700656](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/19.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/19.png)



#### 2.7.removeAt(position)

**代码实现：**

```kotlin
      //实现removeAt方法
      LinkList.prototype.removeAt = position => {
        //1.越界判断
        if (position < 0 || position >= this.length) {//position不能为length
          return null
        }
        //2.删除元素
        //情况1：position = 0时(删除第一个节点)
        let current = this.head
        if (position ==0 ) {
        //情况2：position > 0时
          this.head = this.head.next
        }else{
          let index = 0
          let previous = null
          while (index++ < position) {
            previous = current
            current = current.next
          }
          //循环结束后，current指向position后一个节点，previous指向current前一个节点
          //再使前一个节点的next指向current的next即可
          previous.next = current.next
        }
        //3，length-1
        this.length -= 1

        //返回被删除节点的data，为此current定义在最上面
        return current.data
      }
```

**过程详解：**

removeAt方法的实现过程：删除节点时存在多种情况：

- **情况1：position = 0**，即移除第一个节点（Node1）。

通过：this.head = this.head.next，改变指向1即可；

虽然Node1的next仍指向Node2，但是没有引用指向Node1，则Node1会被垃圾回收器自动回收，所以不用处理Node1指向Node2的引用next。

[![image-20200306110518877](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/20.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/20.png)



- **情况2：positon > 0**，比如pos = 2即移除第三个节点（Node3）。

**注意：**position = length时position后一个节点为null不能删除，因此position != length；

首先，定义两个变量previous和curent分别指向需要删除位置pos = x的前一个节点和后一个节点；

然后，通过：previous.next = current.next，改变指向1即可；

随后，没有引用指向Node3，Node3就会被自动回收，至此成功删除Node3 。

[![image-20200306104624457](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/21.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/21.png)



**测试代码：**

```javascript
    //测试代码
    //1.创建LinkList
    let list = new LinkList()
    
    //2.插入数据
    list.append('aaa')
    list.append('bbb')
    list.append('ccc')
  
  //3.测试removeAt方法
    console.log(list.removeAt(0));
    console.log(list.removeAt(0));
    console.log(list);
```

**测试结果：**

[![image-20200306000839608](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/22.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/22.png)



#### 2.8.其他方法

其他方法包括：**remove(element)、isEmpty()、size()**

**代码实现：**

```kotlin
/*-------------其他方法的实现--------------*/
      //一.实现remove方法
      LinkList.prototype.remove = (data) => {
        //1.获取data在列表中的位置
        let position = this.indexOf(data)
        //2.根据位置信息，删除结点
        return this.removeAt(position)
      }

      //二.实现isEmpty方法
      LinkList.prototype.isEmpty = () => {
        return this.length == 0
      }

      //三.实现size方法
      LinkList.prototype.size = () => {
        return this.length
      }
```

**测试代码：**

```javascript
    //测试代码
    //1.创建LinkList
    let list = new LinkList()
    
    //2.插入数据
    list.append('aaa')
    list.append('bbb')
    list.append('ccc')

/*---------------其他方法测试----------------*/
  	//remove方法
  	console.log(list.remove('aaa'));
  	console.log(list);
  	//isEmpty方法
  	console.log(list.isEmpty());
  	//size方法
  	console.log(list.size());
```

**测试结果：**

[![image-20200306001247346](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/23.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/单向链表/23.png)



#### 2.9.完整实现

```kotlin
    // 封装链表类
    function LinkList(){
      // 封装一个内部类：节点类
      function Node(data){
        this.data = data;
        this.next = null;
      }

      // 属性
      // 属性head指向链表的第一个节点
      this.head = null;
      this.length = 0;

      // 一.实现append方法
      LinkList.prototype.append = data => {
        //1.创建新节点
        let newNode = new Node(data)

        //2.添加新节点
        //情况1：只有一个节点时候
        if(this.length == 0){
          this.head = newNode
        //情况2：节点数大于1，在链表的最后添加新节点  
        }else {              
          //让变量current指向第一个节点
          let current = this.head
          //当current.next(下一个节点不为空)不为空时，一直循环，直到current指向最后一个节点
          while (current.next){
            current = current.next
          }
          // 最后节点的next指向新的节点
          current.next = newNode
        }
        //3.添加完新结点之后length+1
        this.length += 1
      }

      // 二.实现toString方法
      LinkList.prototype.toString = () => {
        // 1.定义变量
        let current = this.head
        let listString = ""

        // 2.循环获取一个个的节点
        while(current){ 
          listString += current.data + " "
          current = current.next//千万不要忘了拼接完一个节点数据之后，让current指向下一个节点
        }
        return  listString
      }

      // 三.实现insert方法
      LinkList.prototype.insert = (position, data) => {
      //理解positon的含义：position=0表示新界点插入后要成为第1个节点，position=2表示新界点插入后要成为第3个节点
        //1.对position进行越界判断:要求传入的position不能是负数且不能超过LinkList的length
        if(position < 0 || position > this.length){
          return false
        }
        //2.根据data创建newNode
        let newNode = new Node(data)

        //3.插入新节点
        //情况1：插入位置position=0
        if(position == 0){
          // 让新节点指向第一个节点
          newNode.next = this.head
          // 让head指向新节点
          this.head = newNode
        //情况2：插入位置position>0(该情况包含position=length)
        } else{
          let index = 0
          let previous = null
          let current = this.head
          //步骤1：通过while循环使变量current指向position位置的后一个节点(注意while循环的写法)
          while(index++ < position){
          //步骤2：在current指向下一个节点之前，让previous指向current当前指向的节点
            previous = current
            current = current.next
          }
          // 步骤3：通过变量current(此时current已经指向position位置的后一个节点)，使newNode指向position位置的后一个节点
          newNode.next = current
          //步骤4：通过变量previous，使position位置的前一个节点指向newNode
          previous.next = newNode
          
		//我们无法直接操作链表中的节点，但是可以通过变量指向这些节点，以此间接地操作节点；
        }
        //4.新节点插入后要length+1
        this.length += 1;

        return true
      }

      //四.实现get方法
      LinkList.prototype.get = (position) => {
        //1.越界判断
        // 当position = length时，取到的是null所以0 =< position < length
        if(position < 0 || position >= this.length){
          return null
        }
        //2.获取指定的positon位置的后一个节点的data
        //同样使用一个变量间接操作节点
        let current = this.head
        let index = 0
        while(index++ < position){
          current = current.next
        }
        return current.data
      }

      //五.实现indexOf方法
      LinkList.prototype.indexOf = data => {
        //1.定义变量
        let current = this.head
        let index = 0

        //2.开始查找:只要current不指向null就一直循环
        while(current){
          if(current.data == data){
            return index
          }
          current = current.next
          index += 1
        } 

        //3.遍历完链表没有找到，返回-1
        return -1
      }

      //六.实现update方法
      LinkList.prototype.update = (position, newData) => {
        //1.越界判断
        //因为被修改的节点不能为null，所以position不能等于length
        if(position < 0 || position >= this.length){
          return false
        }
        //2.查找正确的节点
        let current = this.head
        let index = 0
        while(index++ < position){
          current = current.next
        }
        //3.将position位置的后一个节点的data修改成newData
        current.data = newData
        //返回true表示修改成功
        return true
      }

      //七.实现removeAt方法
      LinkList.prototype.removeAt = position => {
        //1.越界判断
        if (position < 0 || position >= this.length) {
          return null
        }
        //2.删除元素
        //情况1：position = 0时(删除第一个节点)
        let current = this.head
        if (position ==0 ) {
        //情况2：position > 0时
          this.head = this.head.next
        }else{
          let index = 0
          let previous = null
          while (index++ < position) {
            previous = current
            current = current.next
          }
          //循环结束后，current指向position后一个节点，previous指向current前一个节点
          //再使前一个节点的next指向current的next即可
          previous.next = current.next
        }
        //3，length-1
        this.length -= 1

        //返回被删除节点的data，为此current定义在最上面
        return current.data
      }

/*-------------其他方法的实现--------------*/
      //八.实现remove方法
      LinkList.prototype.remove = (data) => {
        //1.获取data在列表中的位置
        let position = this.indexOf(data)
        //2.根据位置信息，删除结点
        return this.removeAt(position)
      }

      //九.实现isEmpty方法
      LinkList.prototype.isEmpty = () => {
        return this.length == 0
      }

      //十.实现size方法
      LinkList.prototype.size = () => {
        return this.length
      }
    }
```

> 参考资料:[JavaScript数据结构与算法](https://www.bilibili.com/video/BV1x7411L7Q7?from=search&seid=3912456004602554239)