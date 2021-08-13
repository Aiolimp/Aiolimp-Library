## css浮动

### 场景：

正常情况下当我们想得到下面这种布局时，通常想到的都是flex，如果通过浮动(float)实现会怎样呢？

![image-20210813103701436](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210813103701436.png)

### 不清除浮动：

```js
<style>
    .box {
        border: 1px solid black;
        padding: 5px;
        width: 450px;
    }

    .left {
        width: 100px;
        height: 100px;
        background-color: skyblue;
        float: left;
    }

    .right {
        width: 100px;
        height: 100px;
        background-color: skyblue;
        float: right;
    }
</style>

<div class="box">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/0fc11be1680243be9fd75efc5c398936.png)

原因是，浮动的元素会`脱离文档流`，什么叫`脱离文档流`呢，举个例子，有一天你跟你老板说：“老子不想干了，世界那么大，我想去看看”，那从此以后，你老板就管不了你了。`脱离文档流`同理，一个元素一旦浮动，就会脱离文档流，那么他的父元素也管不了他了，布局也会往前推进，所以才出现了上面`父元素高度坍塌`的现象

清除浮动：

### 1.将父级也设置成浮动

```css
.box {
            border: 1px solid black;
            padding: 5px;
            width: 450px;
            float: left
      }

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/680cb75cbea949568bc3d42a1d7b92e2.png)

缺点：如果父级当前还有父级，那么爷爷就会受到影响造成高度坍塌，就会套娃无限循环下去。

### 2.给父级增加定位absolute

```css
 .box {
        position:absolute;
        border: 1px solid black;
        padding: 5px;
        width: 450px;
        height: 100px
    }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/680cb75cbea949568bc3d42a1d7b92e2.png)

缺点：虽然效果可以实现但是`position:absolute`也会脱离文档流，影响整体布局。

### 3.给父级设置`overflow:hidden`

```css
 .box {
        border: 1px solid black;
        padding: 5px;
        width: 450px;
        overflow:hidden
    }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/680cb75cbea949568bc3d42a1d7b92e2.png)

缺点：当文本过长，且包含过长英文时，会出现英文文本被隐藏的情况

```css
<div class="box">
    <div class="left"></div>
    <div class="right"></div>
    <div>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈Aiolimp_Aiolimp_Aiolimp_Aiolimp_Aiolimp_</div>
</div>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/49ec44c144b24591a9123bce9537bf27.png)

### 4.给父级设置对应的高度

```css
.box {
            border: 1px solid black;
            padding: 5px;
            width: 450px;
            height: 100px
      }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/680cb75cbea949568bc3d42a1d7b92e2.png)

缺点：具有局限性，只有知道浮动元素的定宽，才能使用这种方法。

### 5.末尾增加空元素进行clear

关于`clear`：

| 值      | 描述                             |
| ------- | -------------------------------- |
| left    | 在左侧不允许浮动元素。           |
| right   | 在右侧不允许浮动元素。           |
| both    | 左右两侧均不允许浮动元素。       |
| none    | 默认值。允许浮动元素出现在两侧。 |
| inherit | 规定应该从父元素继承clear 的值。 |

所以这里`bottomDiv`设置成`clear:both`，代表了它左右都不能有浮动元素，这迫使了他往下移动，进而撑开了父级盒子的高度。

```css
<div class="box">
        <div class="left"></div>
        <div class="right"></div>
        <div class="bottomDiv"></div>
</div>

.bottomDiv {
            clear: both;
        }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/680cb75cbea949568bc3d42a1d7b92e2.png)

缺点：增加了一个`div`标签，增加了页面的`渲染负担`。

### 6.给父级添加伪元素进行clear(最优解)

![在这里插入图片描述](https://img-blog.csdnimg.cn/680cb75cbea949568bc3d42a1d7b92e2.png)

```css
.box::after {
            content: '.';
            height: 0;
            display: block;
            clear: both;
        }
```

