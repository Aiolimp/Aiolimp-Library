## 目录
- [目录](#目录)
  - [1.介绍一下标准的 CSS 的盒子模型？](#1介绍一下标准的-css-的盒子模型)
  - [2.CSS 选择器有哪些](#2css-选择器有哪些)
    - [优先级](#优先级)
  - [3.::before 和:after 中双冒号和单冒号有什么区别？解释一下这 2 个伪元素的作用。](#3before-和after-中双冒号和单冒号有什么区别解释一下这-2-个伪元素的作用)
  - [4.伪类与伪元素的区别](#4伪类与伪元素的区别)
  - [5.CSS 中哪些属性可以继承？](#5css-中哪些属性可以继承)
  - [6.一般常见的几种居中的方法有](#6一般常见的几种居中的方法有)
  - [7.display 有哪些值？说明他们的作用。](#7display-有哪些值说明他们的作用)
  - [8.position定位](#8position定位)
  - [9.BFC](#9bfc)
    - [BFC可以解决的问题](#bfc可以解决的问题)
  - [10.flex](#10flex)
  - [11.理解前端尺寸vw、vh、rem、em](#11理解前端尺寸vwvhremem)

### 1.介绍一下标准的 CSS 的盒子模型？

盒模型分为IE盒模型和W3C标准盒模型。

- **W3C 标准盒模型：**

属性width,height只包含内容content，不包含border和padding。

width = 内容的宽度

height = 内容的高度

- **IE 盒模型：**

属性width,height包含border和padding，指的是content+padding+border。

width = border + padding + 内容的宽度

height = border + padding + 内容的高度

使用哪个盒模型可以由**box-sizing**(CSS新增的属性)控制，默认值为content-box，即标准盒模型；如果将box-sizing设为border-box则用的是IE盒模型。

css的盒模型由content(内容)、padding(内边距)、border(边框)、margin(外边距)组成。但盒子的大小由content+padding+border这几部分决定，**把margin算进去的那是盒子占据的位置，而不是盒子的大小！**

### 2.CSS 选择器有哪些

（1）id选择器（#myid）
（2）类选择器（.myclassname）
（3）标签选择器（div,h1,p）
（4）后代选择器（h1 p）
（5）相邻后代选择器（子）选择器（ul>li）
（6）兄弟选择器（li~a）
（7）相邻兄弟选择器（li+a）
（8）属性选择器（a[rel="external"]）
（9）伪类选择器（a:hover,li:nth-child）
（10）伪元素选择器（::before、::after）
（11）通配符选择器（*）

#### 优先级

- `!important`
- 内联样式（1000）
- ID选择器（0100）
- 类选择器/属性选择器/伪类选择器（0010）
- 元素选择器/伪元素选择器（0001）
- 关系选择器/通配符选择器（0000）

### 3.::before 和:after 中双冒号和单冒号有什么区别？解释一下这 2 个伪元素的作用。

单冒号（:）用于CSS3伪类，双冒号（::）用于CSS3伪元素。

伪类一般匹配的是元素的一些特殊状态，如hover、link等，而伪元素一般匹配的特殊的位置，比如after、before等。

>想让插入的内容出现在其它内容前，使用::before，否者，使用::after；
>在代码顺序上，::after生成的内容也比::before生成的内容靠后。
>如果按堆栈视角，::after生成的内容会在::before生成的内容之上。

### 4.伪类与伪元素的区别

伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的
元素时，我们可以通过:hover来描述这个元素的状态。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过::be
fore来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

有时你会发现伪元素使用了两个冒号（::）而不是一个冒号（:）。这是CSS3的一部分，并尝试区分伪类和伪元素。大多数浏览
器都支持这两个值。按照规则应该使用（::）而不是（:），从而区分伪类和伪元素。但是，由于在旧版本的W3C规范并未对此进行
特别区分，因此目前绝大多数的浏览器都支持使用这两种方式表示伪元素。

### 5.CSS 中哪些属性可以继承？

每一个属性在定义中都给出了这个属性是否具有继承性，一个具有继承性的属性会在没有指定值的时候，会使用父元素的同属性的值
来作为自己的值。

一般具有继承性的属性有，字体相关的属性，font-size和font-weight等。文本相关的属性，color和text-align等。
表格的一些布局属性、列表属性如list-style等。还有光标属性cursor、元素可见性visibility。

当一个属性不是继承属性的时候，我们也可以通过将它的值设置为inherit来使它从父元素那获取同名的属性值来继承。

### 6.一般常见的几种居中的方法有

- 绝对定位方法：不确定当前div的宽度和高度，采用transform：translate(-50%,-50%)；当前div的父级添加相对定位(position:relative)
- 绝对定位方法：确定当前div宽度和高度吗，margin值为当前div宽度一半的负值。
- 绝对定位：calc函数动态计算  left: calc((200px-50px)/2) ; top: calc((200px-50px)/2) ;
- 我们可以利用margin:0 auto来实现元素的水平居中。
- 绝对定位方法：绝对定位下top left right bottom都设置为0,margin为auto
- flex布局  justify-content: center; align-items: center;

### 7.display 有哪些值？说明他们的作用。

- `block`	块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
- `inline`	行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
- `inline-block` 默认宽度为内容宽度，可以设置宽高，同行显示
- `list-item`	像块类型元素一样显示，并添加样式列表标记。
- `table`	此元素会作为块级表格来显示。
- `none`	元素不显示，并从文档流中移除。
- `inherit`	规定应该从父元素继承display属性的值。

### 8.position定位

`absolute`
生成绝对定位的元素，相对于值不为static的第一个父元素的padding box进行定位，也可以理解为离自己这一级元素最近的
一级position设置为absolute或者relative的父元素的padding box的左上角为原点的。

`fixed`（老IE不支持）
生成绝对定位的元素，相对于浏览器窗口进行定位。

`relative`
生成相对定位的元素，相对于其元素本身所在正常位置进行定位。

`static`
默认值。没有定位，元素出现在正常的流中（忽略top,bottom,left,right,z-index声明）。

`inherit`
规定从父元素继承position属性的值。

### 9.BFC

块格式化上下文（Block Formatting Context，BFC） ,指一个独立的渲染区域。

BFC内部的Box会在垂直方向上一个接一个的放置，并且垂直方向上的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生折叠，不同BFC不会发生折叠。其次，BFC的区域不会与float的元素区域重叠，.计算BFC的高度时，浮动子元素也参与计算。

bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。

BFC也有触发条件：

- 根元素，即`HTML`标签

- 浮动元素：`float`值为`left、right`
- `overflow`值不为 visible

- display`值为` inline-block、table-cell、table-caption、table、inline-table、flex、inline-flex、- - grid、inline-grid

- 定位元素：`position`值为 `absolute、fixed`

#### BFC可以解决的问题

- 垂直外边距重叠问题
- 去除浮动
- 自适用两列布局（`float` + `overflow`）

### 10.flex

**弹性容器：** 设置了display：flex;这个元素为弹性容器，弹性容器中的子元素会按照弹性布局进行排列。

flex容器属性：
1.display属性：

- display:flex 将对象作为弹性伸缩盒展示，相当于块级属性，有默认宽度100%
- display:inline-flex 将对象作为内联块级弹性伸缩盒展示，即行级元素，没有默认宽度

2.flex-direction:指定容器的主轴方向，主轴默认为水平向右方向，项目排列的方向

- flex-direction:row 默认值，主轴横向往右排列
- flex-direction:row-reverse 主轴横向往左排列
- flex-direction:column 垂直方向排列
- flex-direction:column-reverse 垂直方向反向排列

3.flex-wrap:当容器子元素在容器中排列不下时，如何进行换行

- flex-wrap:nowarp 默认不换行，压缩子元素
- flex-warp:warp 子元素换行，从上往下
- flex-warp:warp-reverse 子元素换行，从上往下

4.justify-content：定义子元素在主轴上的对齐方式

- justify-conten:flex-start 默认的是从主轴开始位置对齐
- justify-conten:flex-end 向主轴结束位置对齐
- justify-conten:center 向主轴的中心位置靠拢
- justify-conten:space-between 两端没有间距，中间间隔宽度一样平均分布
- justify-conten:space-around 平均分布，两端有间距，间距为中间间距的一半
- justify-conten:space-evenly 平均分布，两边有间距，间距和中间间距一样

5.align-item：定义子元素在侧轴上的堆砌方式

- align-item:flex-start 向侧轴开始位置靠拢
- align-item:flex-end 向侧轴结束位置靠拢
- align-item:center 向侧轴中心位置靠拢
- align-item:stretch 拉伸占满整个高度(默认,如果设置高度默认则无效)

6.align-content：设置侧轴的多行分布

- align-content: flex-start 多行内容往侧轴开端靠拢
- align-content: flex-end 多行内容往侧轴结束段靠拢
- align-content: center 多行内容居中
- align-content: space-between 平均分布,两边没有间距
- align-content: space-around 平均分布,两边间距为中间间距的一半
- align-content:spece-evenly 平均分布,两边间距和中间间距相等
  注意：如果项目只有一行，该属性不起作用，只有使用了wrap后才起作用

7.弹性布局剩余空间分布设置

   flex:1;//剩余空间分布设置，flex:1 则占用剩余空间整体一份


### 11.理解前端尺寸vw、vh、rem、em

- px: px就是pixel的缩写，意为像素。px就是一张图片最小的一个点，一张位图就是千千万万的这样的点构成的。

- em: **参考物是父元素**的font-size，具有继承的特点。如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。

- rem: css3新单位，**相对于根元素html**（网页）的font-size，不会像em那样，依赖于父元素的字体大小，而造成混乱。

- vw: css3新单位，viewpoint width的缩写，**视窗宽度**，1vw等于视窗宽度的1%。
   举个例子：浏览器宽度1200px, 1 vw = 1200px/100 = 12 px。

- vh: css3新单位，viewpoint height的缩写，**视窗高度**，1vh等于视窗高度的1%。
   举个例子：浏览器高度900px, 1 vh = 900px/100 = 9 px。

### 12.CSS浮动

原因是，浮动的元素会脱离文档流，造成父元素高度坍塌的现象。

清除浮动：

- 将父级也设置成浮动

- 给父级增加定位absolute*

- 给父级设置overflow:hidden

- 给父级设置对应的高度

-  clear: both;

- 给父级添加伪元素进行clear(最优解)

  ```css
             content: '.';
              height: 0;
              display: block;
              clear: both;
  ```

  

### 13.CSS元素隐藏

**display:none**

1.DOM结构：浏览器不会渲染display：none的元素，不占据空间。

2.事件监听：无法进行DOM事件监听。

3.性能：动态改变此属性会引起重排，性能较差。

4.继承：不会被子元素继承，毕竟子元素也不会被渲染。

5.transition:transiton不支持display。

**visiblity：hidden**

1.DOM结构：元素被隐藏，但是会渲染不会消失，占据空间。

2.事件监听：无法进行DOM事件监听。

3.性能：动态改变此属性会引起重绘，性能较高。

4.继承：会被子元素继承，子元素可以通过visibilty:visible来取消隐藏。

5.transition:visible会立即显示，隐藏时会延迟。

**opacity：0**

1.DOM结构：透明度为100%，元素隐藏，占据空间。

2.事件监听：可以进行DOM事件监听。

3.性能：提升为合成层，不会触发重绘，性能较高。

4.继承：会被子元素继承，但是子元素不能使用opacity：1来取消隐藏。

5.transition:opacity可以延时和隐藏

