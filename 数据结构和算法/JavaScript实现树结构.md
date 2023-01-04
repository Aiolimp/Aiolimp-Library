## 一、树结构简介

#### 1.1.简单了解树结构

**什么是树？**

真实的树：

[![image-20200229205530929](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/1.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/1.png)



**树的特点：**

- 树一般都有一个**根**，连接着根的是**树干**；
- 树干会发生分叉，形成许多**树枝**，树枝会继续分化成更小的**树枝**；
- 树枝的最后是**叶子**；

现实生活中很多结构都是树的抽象，模拟的树结构相当于旋转`180°`的树。

[![image-20200229205630945](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/2.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/2.png)



**树结构对比于数组/链表/哈希表有哪些优势呢：**

**数组：**

- 优点：可以通过**下标值访问**，效率高；
- 缺点：查找数据时需要先对数据进行**排序**，生成**有序数组**，才能提高查找效率；并且在插入和删除元素时，需要大量的**位移操作**；

**链表：**

- 优点：数据的插入和删除操作效率都很高；
- 缺点：**查找**效率低，需要从头开始依次查找，直到找到目标数据为止；当需要在链表中间位置插入或删除数据时，插入或删除的效率都不高。

**哈希表：**

- 优点：哈希表的插入/查询/删除效率都非常高；
- 缺点：**空间利用率不高**，底层使用的数组中很多单元没有被利用；并且哈希表中的元素是**无序**的，不能按照固定顺序遍历哈希表中的元素；而且不能快速找出哈希表中**最大值或最小值**这些特殊值。

**树结构：**

优点：树结构综合了上述三种结构的优点，同时也弥补了它们存在的缺点（虽然效率不一定都比它们高），比如树结构中数据都是有序的，查找效率高；空间利用率高；并且可以快速获取最大值和最小值等。

总的来说：**每种数据结构都有自己特定的应用场景**

**树结构：**

- **树（Tree）**:由 n（n ≥ 0）个节点构成的**有限集合**。当 n = 0 时，称为**空树**。

对于任一棵非空树（n > 0），它具备以下性质：

- 数中有一个称为**根（Root）**的特殊节点，用 **r **表示；
- 其余节点可分为 m（m > 0）个互不相交的有限集合 T1，T2，...，Tm，其中每个集合本身又是一棵树，称为原来树的**子树（SubTree）**。

**树的常用术语：**

[![image-20200229221126468](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/3.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/3.png)



- **节点的度（Degree）**：节点的**子树个数**，比如节点B的度为2；
- **树的度**：树的所有节点中**最大的度数**，如上图树的度为2；
- **叶节点（Leaf）**：**度为0的节点**（也称为叶子节点），如上图的H，I等；
- **父节点（Parent）**：度不为0的节点称为父节点，如上图节点B是节点D和E的父节点；
- **子节点（Child）**：若B是D的父节点，那么D就是B的子节点；
- **兄弟节点（Sibling）**：具有同一父节点的各节点彼此是兄弟节点，比如上图的B和C，D和E互为兄弟节点；
- **路径和路径长度**：路径指的是一个节点到另一节点的通道，路径所包含边的个数称为路径长度，比如A->H的路径长度为3；
- **节点的层次（Level）**：规定**根节点在1层**，其他任一节点的层数是其父节点的**层数加1**。如B和C节点的层次为2；
- **树的深度（Depth）**：树种所有节点中的**最大层次**是这棵树的深度，如上图树的深度为4；

#### 1.2.树结构的表示方式

- **最普通的表示方法**：

[![image-20200229230417613](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/4.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/4.png)



如图，树结构的组成方式类似于链表，都是由一个个节点连接构成。不过，根据每个父节点子节点数量的不同，每一个父节点需要的引用数量也不同。比如节点A需要3个引用，分别指向子节点B，C，D；B节点需要2个引用，分别指向子节点E和F；K节点由于没有子节点，所以不需要引用。

这种方法缺点在于我们无法确定某一结点的引用数。

- **儿子-兄弟表示法**：

[![image-20200229232805477](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/5.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/5.png)



这种表示方法可以完整地记录每个节点的数据，比如：

```kotlin
//节点A
Node{
  //存储数据
  this.data = data
  //统一只记录左边的子节点
  this.leftChild = B
  //统一只记录右边的第一个兄弟节点
  this.rightSibling = null
}

//节点B
Node{
  this.data = data
  this.leftChild = E
  this.rightSibling = C
}

//节点F
Node{
  this.data = data
  this.leftChild = null
  this.rightSibling = null
}
```

这种表示法的优点在于每一个节点中引用的数量都是确定的。

- **儿子-兄弟表示法旋转**

以下为儿子-兄弟表示法组成的树结构：

[![image-20200229234549049](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/6.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/6.png)



将其顺时针旋转45°之后：

[![image-20200229235549522](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/7.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/7.png)



这样就成为了一棵**二叉树**，由此我们可以得出结论：**任何树都可以通过二叉树进行模拟**。但是这样父节点不是变了吗？其实，父节点的设置只是为了方便指向子节点，在代码实现中谁是父节点并没有关系，只要能正确找到对应节点即可。

## 二、二叉树

#### 2.1.二叉树简介

**二叉树的概念**：如果树中的每一个节点最多只能由**两个子节点**，这样的树就称为**二叉树**；

二叉树十分重要，不仅仅是因为简单，更是因为几乎所有的树都可以表示成二叉树形式。

**二叉树的组成**：

- 二叉树可以为空，也就是没有节点；
- 若二叉树不为空，则它由根节点和称为其左子树TL和右子树TR的两个不相交的二叉树组成；

**二叉树的五种形态**：

[![image-20200301001718079](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/8.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/8.png)



上图分别表示：空的二叉树、只有一个节点的二叉树、只有左子树TL的二叉树、只有右子树TR的二叉树和有左右两个子树的二叉树。

**二叉树的特性**：

- 一个二叉树的第 i 层的最大节点树为：2(i-1)，i >= 1；
- 深度为k的二叉树的最大节点总数为：2k - 1 ，k >= 1；
- 对任何非空二叉树，若 n0 表示叶子节点的个数，n2表示度为2的非叶子节点个数，那么两者满足关系：n0 = n2 + 1；如下图所示：H，E，I，J，G为叶子节点，总数为5；A，B，C，F为度为2的非叶子节点，总数为4；满足n0 = n2 + 1的规律。

[![image-20200301092140211](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/9.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/9.png)



#### 2.2.特殊的二叉树

**完美二叉树**

完美二叉树（Perfect Binary Tree）也成为满二叉树（Full Binary Tree），在二叉树中，除了最下一层的叶子节点外，每层节点都有2个子节点，这就构成了完美二叉树。

[![image-20200301093237681](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/10.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/10.png)



**完全二叉树**

完全二叉树（Complete Binary Tree）:

- 除了二叉树最后一层外，其他各层的节点数都达到了最大值；
- 并且，最后一层的叶子节点从左向右是连续存在，只缺失右侧若干叶子节点；
- 完美二叉树是特殊的完全二叉树；

[![image-20200301093659373](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/11.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/11.png)



在上图中，由于H缺失了右子节点，所以它不是完全二叉树。

#### 2.3.二叉树的数据存储

常见的二叉树存储方式为**数组**和**链表**：

**使用数组：**

- **完全二叉树**：按从上到下，从左到右的方式存储数据。

[![image-20200301094919588](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/12.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/12.png)

image-20200301094919588



| 节点     | A     | B     | C     | D     | E     | F     | G     | H     |
| -------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **序号** | **1** | **2** | **3** | **4** | **5** | **6** | **7** | **8** |

使用数组存储时，取数据的时候也十分方便：左子节点的序号等于父节点序号 * 2，右子节点的序号等于父节点序号 * 2 + 1 。

- **非完全二叉树**：非完全二叉树需要转换成完全二叉树才能按照上面的方案存储，这样会浪费很大的存储空间。

[![image-20200301100043636](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/13.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/13.png)



| 节点     | A     | B     | C     | ^     | ^     | F     | ^     | ^     | ^     | ^      | ^      | ^      | M      |
| -------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ------ | ------ | ------ | ------ |
| **序号** | **1** | **2** | **3** | **4** | **5** | **6** | **7** | **8** | **9** | **10** | **11** | **12** | **13** |

**使用链表**

二叉树最常见的存储方式为**链表**：每一个节点封装成一个Node，Node中包含存储的数据、左节点的引用和右节点的引用。

[![image-20200301100616105](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/14.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/14.png)



## 三、二叉搜索树

#### 3.1.认识二叉搜索树

**二叉搜索树**（**BST**，Binary Search Tree），也称为**二叉排序树**和**二叉查找树**。

二叉搜索树是一棵二叉树，可以为空；

如果不为空，则满足以下**性质**：

- 条件1：非空左子树的**所有**键值**小于**其根节点的键值。比如三中节点6的所有非空左子树的键值都小于6；
- 条件2：非空右子树的**所有**键值**大于**其根节点的键值；比如三中节点6的所有非空右子树的键值都大于6；
- 条件3：左、右子树本身也都是二叉搜索树；

[![image-20200301103139916](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/15.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/15.png)



如上图所示，树二和树三符合3个条件属于二叉树，树一不满足条件3所以不是二叉树。

**总结：**二叉搜索树的特点主要是**较小的值**总是保存在**左节点**上，相对**较大的值**总是保存在**右节点**上。这种特点使得二叉搜索树的查询效率非常高，这也就是二叉搜索树中"搜索"的来源。

#### 3.2.二叉搜索树应用举例

下面是一个二叉搜索树：

[![image-20200301111718686](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/16.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/16.png)



若想在其中查找数据10，只需要查找4次，查找效率非常高。

- 第1次：将10与根节点9进行比较，由于10 > 9，所以10下一步与根节点9的右子节点13比较；
- 第2次：由于10 < 13，所以10下一步与父节点13的左子节点11比较；
- 第3次：由于10 < 11，所以10下一步与父节点11的左子节点10比较；
- 第4次：由于10 = 10，最终查找到数据10 。

[![image-20200301111751041](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/17.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/17.png)

同样是15个数据，在排序好的数组中查询数据10，需要查询10次：



[![image-20200301115348138](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%B8%80/18.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树一/18.png)



其实：如果是排序好的数组，可以通过二分查找：第一次找9，第二次找13，第三次找15...。我们发现如果把每次二分的数据拿出来以树的形式表示的话就是**二叉搜索树**。这就是数组二分法查找效率之所以高的原因。

## 四、二叉搜索树的封装

**二叉树搜索树的基本属性**：

如图所示：二叉搜索树有四个最基本的属性：指向节点的**根**（root），节点中的**键**（key）、**左指针**（right）、**右指针**（right）。

[![image-20200301162706755](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/1.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/1.png)



所以，二叉搜索树中除了定义root属性外，还应定义一个节点内部类，里面包含每个节点中的left、right和key三个属性：

```javascript
    //封装二叉搜索树
    function BinarySearchTree(){

      //节点内部类
      function Node(key){
        this.key = key
        this.left = null
        this.right = null
      }

      //属性
      this.root = null
  }
```

**二叉搜索树的常见操作：**

- insert（key）：向树中插入一个新的键；
- search（key）：在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回false；
- inOrderTraverse：通过中序遍历方式遍历所有节点；
- preOrderTraverse：通过先序遍历方式遍历所有节点；
- postOrderTraverse：通过后序遍历方式遍历所有节点；
- min：返回树中最小的值/键；
- max：返回树中最大的值/键；
- remove（key）：从树中移除某个键；

#### 1.插入数据

**实现思路：**

- 首先根据传入的key创建节点对象；
- 然后判断根节点是否存在，不存在时通过：this.root = newNode，直接把新节点作为二叉搜索树的根节点。
- 若存在根节点则重新定义一个内部方法insertNode（）用于查找插入点。

```JavaScript
     //insert方法:对外向用户暴露的方法
      BinarySearchTree.prototype.insert = function(key){
        //1.根据key创建节点
        let newNode = new Node(key)
          
        //2.判断根节点是否存在
        if (this.root == null) {
          this.root = newNode
          //根节点存在时
        }else {
          this.insertNode(this.root, newNode)
        }
      }
```

**内部方法insertNode（）的实现思路**:

根据比较传入的两个节点，一直查找新节点适合插入的位置，直到成功插入新节点为止。

当newNode.key < node.key向左查找:

- 情况1：当node无左子节点时，直接插入：
- 情况2：当node有左子节点时，递归调用insertNode(),直到遇到无左子节点成功插入newNode后，不再符合该情况，也就不再调用insertNode()，递归停止。

[![image-20200301191640632](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/2.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/2.png)



当newNode.key >= node.key向右查找，与向左查找类似：

- 情况1：当node无右子节点时，直接插入：
- 情况2：当node有右子节点时，依然递归调用insertNode(),直到遇到传入insertNode方法的node无右子节点成功插入newNode为止：

[![image-20200301191507181](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/3.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/3.png)



**insertNode()代码实现：**

```javascript
      //内部使用的insertNode方法:用于比较节点从左边插入还是右边插入
      BinarySearchTree.prototype.insertNode = function(node, newNode){
        //当newNode.key < node.key向左查找
/*----------------------分支1:向左查找--------------------------*/      
        if(newNode.key < node.key){
          //情况1：node无左子节点，直接插入
/*----------------------分支1.1--------------------------*/
          if (node.left == null) {
            node.left = newNode
          //情况2：node有左子节点，递归调用insertNode(),直到遇到无左子节点成功插入newNode后，不再符合该情况，也就不再调用insertNode()，递归停止。
/*----------------------分支1.2--------------------------*/
          }else{
            this.insertNode(node.left, newNode)
          }
        //当newNode.key >= node.key向右查找
/*-----------------------分支2:向右查找--------------------------*/        
        }else{
          //情况1：node无右子节点，直接插入
/*-----------------------分支2.1--------------------------*/ 
          if(node.right == null){
            node.right == newNode
          //情况2：node有右子节点，依然递归调用insertNode(),直到遇到无右子节点成功插入newNode为止
/*-----------------------分支2.2--------------------------*/ 
          }else{
            this.insertNode(node.right, newNode)
          }
        }
      }
```

**过程详解：**

为了更好理解以下列二叉搜索树为例：

[![image-20200301193104003](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/4.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/4.png)



想要上述的二叉搜索树（蓝色）中插入数据10：

- 先把key = 10 传入insert方法，由于存在根节点 9，所以直接调用insetNode方法，传入的参数：node = 9，newNode = 10；
- 由于10 > 9，进入分支2，向右查找适合插入的位置；
- 由于根节点 9 的右子节点存在且为 13 ，所以进入分支2.2，递归调用insertNode方法，传入的参数：node = 13，newNode = 10；
- 由于 10 < 13 ，进入分支1，向左查找适合插入的位置；
- 由于父节点 13 的左子节点存在且为11，所以进入分支1.2，递归调用insertNode方法，传入的参数：node = 11，newNode = 10；
- 由于 10 < 11，进入分支1，向左查找适合插入的位置；
- 由于父节点 11 的左子节点不存在，所以进入分支1.1，成功插入节点 10 。由于不符合分支1.2的条件所以不会继续调用insertNode方法，递归停止。

**测试代码：**

```avrasm
    //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(9);
	console.log(bst);
```

应得到下图所示的二叉搜索树：

[![image-20200302002708576](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/5.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/5.png)

**测试结果**

[![image-20200302002409735](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/6.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/6.png)



#### 2.遍历数据

这里所说的树的遍历不仅仅针对二叉搜索树，而是适用于所有的二叉树。由于树结构不是线性结构，所以遍历方式有多种选择，常见的三种二叉树遍历方式为：

- 先序遍历；
- 中序遍历；
- 后序遍历；

还有层序遍历，使用较少。

##### 2.1.先序遍历

先序遍历的过程为：

- 首先，遍历根节点；
- 然后，遍历其左子树；
- 最后，遍历其右子树；

[![image-20200301213506159](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/7.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/7.png)



如上图所示，二叉树的节点遍历顺序为：A -> B -> D -> H -> I -> E -> C -> F -> G。

**代码实现：**

```javascript
	  //先序遍历
      //掺入一个handler函数方便之后对得到的key进行处理
      BinarySearchTree.prototype.preOrderTraversal = function(handler){
        this.preOrderTraversalNode(this.root, handler)
      }

      //封装内部方法，对某个节点进行遍历
      BinarySearchTree.prototype.preOrderTraversalNode = function(node,handler){
        if (node != null) {
          //1.处理经过的节点
          handler(node.key)
/*----------------------递归1----------------------------*/
          //2.遍历左子树中的节点
          this.preOrderTraversalNode(node.left, handler)
/*----------------------递归2----------------------------*/
          //3.遍历右子树中的节点
          this.preOrderTraversalNode(node.right, handler)
        }
      }
```

**过程详解：**

以遍历以下二叉搜索树为例：

[![image-20200301221450001](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/8.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/8.png



首先调用preOrderTraversal方法，在方法里再调用preOrderTraversalNode方法用于遍历二叉搜索树。在preOrderTraversalNode方法中，递归1负责遍历左子节点，递归2负责遍历右子节点。先执行递归1，执行过程如下图所示：

> **记：preOrderTraversalNode() 为 A()**

[![image-20200302000248291](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/9.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/9.png)



可以看到一共递归调用了4次方法A，分别传入11、7、5、3，最后遇到null不满足 node != null 条件结束递归1；注意此时只是执行完最开始的递归1，并没有执行递归2，并且递归1执行到null停止后要一层层地往上返回，按顺序将调用的函数压出函数调用栈。

关于函数调用栈：之前的四次递归共把4个函数压入了函数调用栈，现在递归执行完了一层层地把函数压出栈。

值得注意的是：每一层函数都只是执行完了递归1，当返回到该层函数时，比如A（3）要继续执行递归2遍历二叉搜索树中的右子节点；

在执行递归2的过程中会不断调用方法A，并依次执行递归1和递归2，以此类推直到遇到null不满足 node != null 条件为止，才停止递归并一层层返回，如此循环。同理A（5）层、A（7）层、A（11）层都要经历上述循环，直到将二叉搜索树中的节点全部遍历完为止。

具体过程如下图所示：

[![image-20200302000007414](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/10.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/10.png)



**测试代码：**

```javascript
    //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(3);
    bst.insert(9);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(12);
    bst.insert(14);
    bst.insert(20);
    bst.insert(18);
    bst.insert(25);
    bst.insert(6);
    
    //3.测试遍历
    let resultString = ""
    //掺入处理节点值的处理函数
    bst.preOrderTraversal(function(key){
      resultString += key + "->"
    })
    alert(resultString)
```

应输出这样的顺序：11 -> 7 -> 5 -> 3 -> 6 -> 9 -> 8 -> 10 -> 15 -> 13 ->12 -> 14 -> 20 -> 18 -> 25 。

**测试结果：**

[![image-20200302003244874](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/11.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/11.png)



##### 2.2.中序遍历

实现思路：与先序遍历原理相同，只不过是遍历的顺序不一样了。

- 首先，遍历其左子树；
- 然后，遍历根（父）节点；
- 最后，遍历其右子树；

**代码实现：**

```//2.中序遍历
      //中序遍历
      BinarySearchTree.prototype.midOrderTraversal = function(handler){
        this.midOrderTraversalNode(this.root, handler)
      }

      BinarySearchTree.prototype.midOrderTraversalNode = function(node, handler){
        if (node != null) {
          //1.遍历左子树中的节点
          this.midOrderTraversalNode(node.left, handler)
          
          //2.处理节点
          handler(node.key)

          //3.遍历右子树中的节点
          this.midOrderTraversalNode(node.right, handler)
        }
      }
```

**过程详解：**

遍历的顺序应如下图所示：

[![image-20200302112920295](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/12.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/12.png)



首先调用midOrderTraversal方法，在方法里再调用midOrderTraversalNode方法用于遍历二叉搜索树。先使用递归1遍历左子树中的节点；然后，处理父节点；最后，遍历右子树中的节点。

**测试代码：**

```javascript
  //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(3);
    bst.insert(9);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(12);
    bst.insert(14);
    bst.insert(20);
    bst.insert(18);
    bst.insert(25);
    bst.insert(6);	
    
    //3.测试中序遍历
    let resultString2 =""
    bst.midOrderTraversal(function(key){
      resultString2 += key + "->"
    })
    alert(resultString2)
```

输出节点的顺序应为：3 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13 -> 14 -> 15 -> 18 -> 20 -> 25 。

**测试结果：**

[![image-20200302112326786](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/13.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/13.png)



##### 2.3.后续遍历

实现思路：与先序遍历原理相同，只不过是遍历的顺序不一样了。

- 首先，遍历其左子树；
- 然后，遍历其右子树；
- 最后，遍历根（父）节点；

**代码实现：**

```javascript
      //后序遍历
      BinarySearchTree.prototype.postOrderTraversal = function(handler){
        this.postOrderTraversalNode(this.root, handler)
      }

      BinarySearchTree.prototype.postOrderTraversalNode = function(node, handler){
        if (node != null) {
          //1.遍历左子树中的节点
          this.postOrderTraversalNode(node.left, handler)
          
          //2.遍历右子树中的节点
          this.postOrderTraversalNode(node.right, handler)

          //3.处理节点
          handler(node.key)
        }
      }
```

**过程详解：**

遍历的顺序应如下图所示：

[![image-20200302120246366](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/14.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/14.png)



首先调用postOrderTraversal方法，在方法里再调用postOrderTraversalNode方法用于遍历二叉搜索树。先使用递归1遍历左子树中的节点；然后，遍历右子树中的节点；最后，处理父节点。

**测试代码：**

```javascript
    //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(3);
    bst.insert(9);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(12);
    bst.insert(14);
    bst.insert(20);
    bst.insert(18);
    bst.insert(25);
    bst.insert(6);
    
    //3.测试后序遍历
    let resultString3 =""
    bst.postOrderTraversal(function(key){
      resultString3 += key + "->"
    })
    alert(resultString3)
```

输出节点的顺序应为：3 -> 6 -> 5 -> 8 -> 10 -> 9 -> 7 -> 12 -> 14 -> 13 -> 18 -> 25 -> 20 -> 15 -> 11 。

**测试结果：**

[![image-20200302115446608](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/15.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/15.png)



**总结：**以遍历根（父）节点的顺序来区分三种遍历方式。比如：先序遍历先遍历根节点、中序遍历第二遍历根节点、后续遍历最后遍历根节点。

#### 3.查找数据

##### 3.1.查找最大值&最小值

在二叉搜索树中查找最值非常简单，最小值在二叉搜索树的最左边，最大值在二叉搜索树的最右边。只需要一直向左/右查找就能得到最值，如下图所示：

[![image-20200302125521501](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/16.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/16.png)



**代码实现：**

```javascript
      //寻找最大值
      BinarySearchTree.prototype.max = function () {
        //1.获取根节点
        let node = this.root
        //2.定义key保存节点值
        let key = null
        //3.依次向右不断查找，直到节点为null
        while (node != null) {
          key = node.key
          node = node.right
        }
        return key
      }

      //寻找最小值
      BinarySearchTree.prototype.min = function(){
         //1.获取根节点
         let node = this.root
        //2.定义key保存节点值
        let key = null
        //3.依次向左不断查找，直到节点为null
        while (node != null) {
          key = node.key
          node = node.left
        }
        return key
      }
```

**测试代码：**

```javascript
   //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(3);
    bst.insert(9);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(12);
    bst.insert(14);
    bst.insert(20);
    bst.insert(18);
    bst.insert(25);
    bst.insert(6);
    
    //4.测试最值
    console.log(bst.max());
    console.log(bst.min());
    
```

**测试结果：**

[![image-20200302133028801](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/17.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/17.png)



##### 3.2.查找特定值

查找二叉搜索树当中的特定值效率也非常高。只需要从根节点开始将需要查找节点的key值与之比较，若**node.key < root**则向左查找，若**node.key > root**就向右查找，直到找到或查找到null为止。这里可以使用递归实现，也可以采用循环来实现。

**实现代码：**

```javascript
     //查找特定的key
      BinarySearchTree.prototype.search = function(key){
        //1.获取根节点
        let node = this.root

        //2.循环搜索key
        while(node != null){
          if (key < node.key) {
            //小于根(父)节点就往左边找
            node = node.left
            //大于根(父)节点就往右边找
          }else if(key > node.key){
            node = node.right
          }else{
            return true
          }
        } 
        return false
      }
```

**测试代码：**

```javascript
    //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(3);
    bst.insert(9);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(12);
    bst.insert(14);
    bst.insert(20);
    bst.insert(18);
    bst.insert(25);
    bst.insert(6);
    
    //3.测试搜索方法
    console.log(bst.search(24));//false
    console.log(bst.search(13));//true
    console.log(bst.search(2));//false
```

**测试结果：**

[![image-20200302141031370](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/18.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/18.png)



#### 4.删除数据

**实现思路：**

**第一步：**先找到需要删除的节点，若没找到，则不需要删除；

首先定义变量current用于保存需要删除的节点、变量parent用于保存它的父节点、变量isLeftChild保存current是否为parent的左节点，这样方便之后删除节点时改变相关节点的指向。

**实现代码：**

```javascript
 		//1.1.定义变量
        let current = this.root
        let parent = null
        let isLeftChild = true

        //1.2.开始寻找删除的节点
        while (current.key != key) {
          parent = current
          // 小于则往左查找
          if (key < current.key) {
            isLeftChild = true
            current = current.left
          } else{
            isLeftChild = false
            current = current.rigth
          }
          //找到最后依然没有找到相等的节点
          if (current == null) {
            return false
          }
        }
        //结束while循环后：current.key = key
```

**第二步：**删除找到的指定节点，后分3种情况：

- 删除叶子节点；
- 删除只有一个子节点的节点；
- 删除有两个子节点的节点；

##### 4.1.情况1：没有子节点

没有子节点时也有两种情况：

当该叶子节点为根节点时，如下图所示，此时**current == this.root**，直接通过：**this.root = null**，删除根节点。

[![image-20200302154316749](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/19.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/19.png)



当该叶子节点不为根节点时也有两种情况，如下图所示：

[![image-20200302154019653](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/20.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/20.png)



若current = 8，可以通过：parent.left = null，删除节点8；

若current = 10，可以通过：parent.right = null，删除节点10；

**代码实现：**

```javas
        //情况1：删除的是叶子节点(没有子节点)
        if (current.left == null && current.right ==null) {
          if (current == this.root) {
            this.root = null
          }else if(isLeftChild){
            parent.left = null
          }else {
            parent.right =null
          }
        }
```

##### 4.2.情况2：有一个子节点

有六种情况分别是：

当current存在左子节点时（current.right == null）：

- 情况1：current为根节点（current == this.root），如节点11，此时通过：this.root = current.left，删除根节点11；
- 情况2：current为父节点parent的左子节点（isLeftChild == true），如节点5，此时通过：parent.left = current.left，删除节点5；
- 情况3：current为父节点parent的右子节点（isLeftChild == false），如节点9，此时通过：parent.right = current.left，删除节点9；

[![image-20200302172806401](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/21.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/21.png)



当current存在右子节点时（current.left = null）：

- 情况4：current为根节点（current == this.root），如节点11，此时通过：this.root = current.right，删除根节点11。
- 情况5：current为父节点parent的左子节点（isLeftChild == true），如节点5，此时通过：parent.left = current.right，删除节点5；
- 情况6：current为父节点parent的右子节点（isLeftChild == false），如节点9，此时通过：parent.right = current.right，删除节点9；

[![image-20200302172527722](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/22.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/22.png)



**实现代码：**

```javascript
        //情况2：删除的节点有一个子节点
        //当current存在左子节点时
        else if(current.right == null){
            if (current == this.root) {
              this.root = current.left
            } else if(isLeftChild) {
                parent.left = current.left
            } else{
                parent.right = current.left
            }
        //当current存在右子节点时
      } else if(current.left == null){
            if (current == this.root) {
              this.root = current.rigth
            } else if(isLeftChild) {
                parent.left = current.right
            } else{
                parent.right = current.right
            } 
      }
```

##### 4.3.情况3：有两个子节点

这种情况**十分复杂**，首先依据以下二叉搜索树，讨论这样的问题：

[![image-20200302181849832](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/23.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/23.png)



**删除节点9**

在保证删除节点9后原二叉树仍为二叉搜索树的前提下，有两种方式：

- 方式1：从节点9的左子树中选择一合适的节点替代节点9，可知节点8符合要求；
- 方式2：从节点9的右子树中选择一合适的节点替代节点9，可知节点10符合要求；

[![image-20200302190601622](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/24.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/24.png)



**删除节点7**

在保证删除节点7后原二叉树仍为二叉搜索树的前提下，也有两种方式：

- 方式1：从节点7的左子树中选择一合适的节点替代节点7，可知节点5符合要求；
- 方式2：从节点7的右子树中选择一合适的节点替代节点7，可知节点8符合要求；

[![image-20200302183058326](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/25.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/25.png)



**删除节点15**

在保证删除节点15后原树二叉树仍为二叉搜索树的前提下，同样有两种方式：

- 方式1：从节点15的左子树中选择一合适的节点替代节点15，可知节点14符合要求；
- 方式2：从节点15的右子树中选择一合适的节点替代节点15，可知节点18符合要求；

[![image-20200302184038470](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/26.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/26.png)



相信你已经发现其中的规律了！

**规律总结：**如果要删除的节点有两个子节点，甚至子节点还有子节点，这种情况下需要从要删除节点**下面的子节点中找到一个合适的节点**，来替换当前的节点。

若用current表示需要删除的节点，则合适的节点指的是：

- current左子树中比current**小一点点的节点**，即current**左子树**中的**最大值**；
- current右子树中比current**大一点点的节点**，即current**右子树**中的**最小值**；

**前驱&后继**

在二叉搜索树中，这两个特殊的节点有特殊的名字：

- 比current小一点点的节点，称为current节点的**前驱**。比如下图中的节点5就是节点7的前驱；
- 比current大一点点的节点，称为current节点的**后继**。比如下图中的节点8就是节点7的后继；

[![image-20200302210841453](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/27.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/27.png)



**代码实现：**

- 查找需要被删除的节点current的后继时，需要在current的**右子树**中查找**最小值**，即在current的**右子树**中一直**向左遍历**查找；
- 查找前驱时，则需要在current的**左子树**中查找**最大值**，即在current的**左子树**中一直**向右**遍历查找。

下面只讨论查找current后继的情况，查找前驱的原理相同，这里暂不讨论。

##### 4.4.完整实现

```kotlin
      //删除节点
      BinarySearchTree.prototype.remove = function(key){
/*------------------------------1.寻找要删除的节点---------------------------------*/
        //1.1.定义变量current保存删除的节点，parent保存它的父节点。isLeftChild保存current是否为parent的左节点
        let current = this.root
        let parent = null
        let isLeftChild = true

        //1.2.开始寻找删除的节点
        while (current.key != key) {
          parent = current
          // 小于则往左查找
          if (key < current.key) {
            isLeftChild = true
            current = current.left
          } else{
            isLeftChild = false
            current = current.right
          }
          //找到最后依然没有找到相等的节点
          if (current == null) {
            return false
          }
        }
        //结束while循环后：current.key = key

/*------------------------------2.根据对应情况删除节点------------------------------*/
        //情况1：删除的是叶子节点(没有子节点)
        if (current.left == null && current.right ==null) {
          if (current == this.root) {
            this.root = null
          }else if(isLeftChild){
            parent.left = null
          }else {
            parent.right =null
          }
        }
        //情况2：删除的节点有一个子节点
        //当current存在左子节点时
        else if(current.right == null){
            if (current == this.root) {
              this.root = current.left
            } else if(isLeftChild) {
                parent.left = current.left
            } else{
                parent.right = current.left
            }
        //当current存在右子节点时
      } else if(current.left == null){
            if (current == this.root) {
              this.root = current.right
            } else if(isLeftChild) {
                parent.left = current.right
            } else{
                parent.right = current.right
            } 
      }
        //情况3：删除的节点有两个子节点
        else{
          //1.获取后继节点
          let successor = this.getSuccessor(current)

          //2.判断是否根节点
          if (current == this.root) {
            this.root = successor
          }else if (isLeftChild){
            parent.left = successor
          }else{
            parent.right = successor
          }

          //3.将后继的左子节点改为被删除节点的左子节点
          successor.left = current.left
        }
      }

      //封装查找后继的方法
      BinarySearchTree.prototype.getSuccessor = function(delNode){
        //1.定义变量,保存找到的后继
        let successor = delNode
        let current = delNode.right
        let successorParent = delNode

        //2.循环查找current的右子树节点
        while(current != null){
          successorParent = successor
          successor = current
          current = current.left
        }

        //3.判断寻找到的后继节点是否直接就是删除节点的right节点
        if(successor != delNode.right){
          successorParent.left = successor.right
          successor.right = delNode.right 
        }
        return successor
      }
```

**测试代码：**

```csharp
   //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(3);
    bst.insert(9);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(12);
    bst.insert(14);
    bst.insert(20);
    bst.insert(18);
    bst.insert(25);
    bst.insert(6);
    bst.insert(19);
    
   //3.测试删除代码
    //删除没有子节点的节点
    bst.remove(3)
    bst.remove(8)
    bst.remove(10)

    //删除有一个子节点的节点
    bst.remove(5)
    bst.remove(19)

    //删除有两个子节点的节点
    bst.remove(9)
    bst.remove(7)
    bst.remove(15)

    //遍历二叉搜索树并输出
    let resultString = ""
    bst.midOrderTraversal(function(key){
      resultString += key + "->"
    })
    alert(resultString)
```

**测试结果：**

[![image-20200302225943296](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/28.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/28.png)

image-20200302225943296



可见三种情况的节点都被成功删除了。

#### 5.二叉搜索树完整封装

```kotlin
    //封装二叉搜索树
    function BinarySearchTree(){

      //节点内部类
      function Node(key){
        this.key = key
        this.left = null
        this.right = null
      }

      //属性
      this.root = null

      //方法
      //一.插入数据：insert方法:对外向用户暴露的方法
      BinarySearchTree.prototype.insert = function(key){
        //1.根据key创建节点
        let newNode = new Node(key)
          
        //2.判断根节点是否存在
        if (this.root == null) {
          this.root = newNode
          //根节点存在时
        }else {
          this.insertNode(this.root, newNode)
        }
      }

      //内部使用的insertNode方法:用于比较节点从左边插入还是右边插入
      BinarySearchTree.prototype.insertNode = function(node, newNode){
        //当newNode.key < node.key向左查找
        if(newNode.key < node.key){
          //情况1：node无左子节点，直接插入
          if (node.left == null) {
            node.left = newNode
          //情况2：node有左子节点，递归调用insertNode(),直到遇到无左子节点成功插入newNode后，不再符合该情况，也就不再调用insertNode()，递归停止。
          }else{
            this.insertNode(node.left, newNode)
          }
        //当newNode.key >= node.key向右查找
        }else{
          //情况1：node无右子节点，直接插入
          if(node.right == null){
            node.right = newNode
          //情况2：node有右子节点，依然递归调用insertNode(),直到遇到无右子节点成功插入newNode为止
          }else{
            this.insertNode(node.right, newNode)
          }
        }
      }

      //二.树的遍历
      //1.先序遍历
      //掺入一个handler函数对得到的key进行处理
      BinarySearchTree.prototype.preOrderTraversal = function(handler){
        this.preOrderTraversalNode(this.root, handler)
      }

      //封装内部方法，对某个节点进行遍历
      BinarySearchTree.prototype.preOrderTraversalNode = function(node,handler){
        if (node != null) {
          //1.处理经过的节点
          handler(node.key)

          //2.遍历经过节点的左子节点
          this.preOrderTraversalNode(node.left, handler)

          //3.遍历经过节点的右子节点
          this.preOrderTraversalNode(node.right, handler)
        }
      }

      //2.中序遍历
      BinarySearchTree.prototype.midOrderTraversal = function(handler){
        this.midOrderTraversalNode(this.root, handler)
      }

      BinarySearchTree.prototype.midOrderTraversalNode = function(node, handler){
        if (node != null) {
          //1.遍历左子树中的节点
          this.midOrderTraversalNode(node.left, handler)
          
          //2.处理节点
          handler(node.key)

          //3.遍历右子树中的节点
          this.midOrderTraversalNode(node.right, handler)
        }
      }

      //3.后序遍历
      BinarySearchTree.prototype.postOrderTraversal = function(handler){
        this.postOrderTraversalNode(this.root, handler)
      }

      BinarySearchTree.prototype.postOrderTraversalNode = function(node, handler){
        if (node != null) {
          //1.遍历左子树中的节点
          this.postOrderTraversalNode(node.left, handler)
          
          //2.遍历右子树中的节点
          this.postOrderTraversalNode(node.right, handler)

          //3.处理节点
          handler(node.key)
        }
      }

      //三.寻找最值
      //寻找最大值
      BinarySearchTree.prototype.max = function () {
        //1.获取根节点
        let node = this.root
        //2.定义key保存节点值
        let key = null
        //3.依次向右不断查找，直到节点为null
        while (node != null) {
          key = node.key
          node = node.right
        }
        return key
      }

      //寻找最小值
      BinarySearchTree.prototype.min = function(){
         //1.获取根节点
         let node = this.root
        //2.定义key保存节点值
        let key = null
        //3.依次向左不断查找，直到节点为null
        while (node != null) {
          key = node.key
          node = node.left
        }
        return key
      }

      //查找特定的key
      BinarySearchTree.prototype.search = function(key){
        //1.获取根节点
        let node = this.root

        //2.循环搜索key
        while(node != null){
          if (key < node.key) {
            //小于根(父)节点就往左边找
            node = node.left
            //大于根(父)节点就往右边找
          }else if(key > node.key){
            node = node.right
          }else{
            return true
          }
        } 
        return false
      }

      //四.删除节点
      BinarySearchTree.prototype.remove = function(key){
/*------------------------------1.寻找要删除的节点---------------------------------*/
        //1.1.定义变量current保存删除的节点，parent保存它的父节点。isLeftChild保存current是否为parent的左节点
        let current = this.root
        let parent = null
        let isLeftChild = true

        //1.2.开始寻找删除的节点
        while (current.key != key) {
          parent = current
          // 小于则往左查找
          if (key < current.key) {
            isLeftChild = true
            current = current.left
          } else{
            isLeftChild = false
            current = current.right
          }
          //找到最后依然没有找到相等的节点
          if (current == null) {
            return false
          }
        }
        //结束while循环后：current.key = key

/*------------------------------2.根据对应情况删除节点------------------------------*/
        //情况1：删除的是叶子节点(没有子节点)
        if (current.left == null && current.right ==null) {
          if (current == this.root) {
            this.root = null
          }else if(isLeftChild){
            parent.left = null
          }else {
            parent.right =null
          }
        }
        //情况2：删除的节点有一个子节点
        //当current存在左子节点时
        else if(current.right == null){
            if (current == this.root) {
              this.root = current.left
            } else if(isLeftChild) {
                parent.left = current.left
            } else{
                parent.right = current.left
            }
        //当current存在右子节点时
      } else if(current.left == null){
            if (current == this.root) {
              this.root = current.right
            } else if(isLeftChild) {
                parent.left = current.right
            } else{
                parent.right = current.right
            } 
      }
        //情况3：删除的节点有两个子节点
        else{
          //1.获取后继节点
          let successor = this.getSuccessor(current)

          //2.判断是否根节点
          if (current == this.root) {
            this.root = successor
          }else if (isLeftChild){
            parent.left = successor
          }else{
            parent.right = successor
          }

          //3.将后继的左子节点改为被删除节点的左子节点
          successor.left = current.left
        }
      }

      //封装查找后继的方法
      BinarySearchTree.prototype.getSuccessor = function(delNode){
        //1.定义变量,保存找到的后继
        let successor = delNode
        let current = delNode.right
        let successorParent = delNode

        //2.循环查找current的右子树节点
        while(current != null){
          successorParent = successor
          successor = current
          current = current.left
        }

        //3.判断寻找到的后继节点是否直接就是删除节点的right节点
        if(successor != delNode.right){
          successorParent.left = successor.right
          successor.right = delNode.right 
        }
        return successor
      }
    }
```

## 五、平衡树

**二叉搜索树的缺陷：**

当插入的数据是有序的数据，就会造成二叉搜索树的深度过大。比如原二叉搜索树右 11 7 15 组成，如下图所示：

[![image-20200302231503639](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/29.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/29.png)



当插入一组有序数据：6 5 4 3 2就会变成深度过大的搜索二叉树，会严重影响二叉搜索树的性能。

[![image-20200302231745864](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/30.png)](https://gitee.com/ahuntsun/BlogImgs/raw/master/数据结构与算法/树二/30.png)



**非平衡树**

- 比较好的二叉搜索树，它的数据应该是**左右均匀分布**的；
- 但是插入**连续数据**后，二叉搜索树中的数据分布就变得**不均匀**了，我们称这种树为**非平衡树**；
- 对于一棵**平衡二叉树**来说，插入/查找等操作的效率是**O（logN）**；
- 而对于一棵**非平衡二叉树**来说，相当于编写了一个链表，查找效率变成了**O（N）**;

**树的平衡性**

为了能以**较快的时间O（logN）**来操作一棵树，我们需要**保证树总是平衡**的：

- 起码大部分是平衡的，此时的时间复杂度也是接近O（logN）的；
- 这就要求树中**每个节点左边的子孙节点**的个数，应该尽可能地等于**右边的子孙节点**的个数；

**常见的平衡树**

- **AVL树**：是最早的一种平衡树，它通过在每个节点多存储一个额外的数据来保持树的平衡。由于AVL树是平衡树，所以它的时间复杂度也是O（logN）。但是它的整体效率不如红黑树，开发中比较少用。
- **红黑树**：同样通过**一些特性**来保持树的平衡，时间复杂度也是O（logN）。进行插入/删除等操作时，性能优于AVL树，所以平衡树的应用基本都是红黑树。