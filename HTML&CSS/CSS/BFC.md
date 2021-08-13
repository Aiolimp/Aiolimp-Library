## BFC

### 1.官方解释：

块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。浏览器对`BFC`的限制规则是：

- 1.生成BFC元素的子元素会一个接一个的放置。
- 2.垂直方向上他们的起点是一个包含块的顶部，两个相邻子元素之间的垂直距离取决于元素的margin特性。在BFC-- 中相邻的块级元素的外边距会折叠(Mastering margin collapsing)。
- 3.生成BFC元素的子元素中，每一个子元素左外边距与包含块的左边界相接触（对于从右到左的格式化，右外边距接触右边界），即使浮动元素也是如此（尽管子元素的内容区域会由于浮动而压缩），除非这个子元素也创建了一个新的BFC（如它自身也是一个浮动元素）。

### 2.触发条件

根元素，即`HTML`标签

浮动元素：`float`值为`left、right`

```
overflow`值不为 visible，为 `auto、scroll、hidden
display`值为` inline-block、table-cell、table-caption、table、inline-table、flex、inline-flex、- - grid、inline-grid
```

定位元素：`position`值为 `absolute、fixed`

### 3.个人理解

- 1.内部的Box会在垂直方向上一个接一个的放置
- 2.内部的Box垂直方向上的距离由margin决定。（完整的说法是：属于同一个BFC的两个相邻Box的margin会发生折叠，不同BFC不会发生折叠。）
- 3.每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明BFC中子元素不会超出他的包含块，而position为absolute的元素可以超出他的包含块边界）
- 4.BFC的区域不会与float的元素区域重叠
- 5.计算BFC的高度时，浮动子元素也参与计算

第`1`点和第`3`点就不用说了，大家都懂，下面就来着重说说第`2，4，5`点吧！

### 4.解决margin重叠问题

假如我想要两个盒子之间距离20px，我这么写：

```js
<div class="box2"></div>
<div class="box3"></div>

.box2 {
            margin-bottom: 10px;
            width: 100px;
            height: 100px;
            background-color: red;
        }

.box3 {
            margin-top: 10px;
            width: 100px;
            height: 100px;
            background-color: red;
        }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/1edd22f2c7dd4e0197d03476569fcf34.png)

结果发现，并没有达到预期，两个盒子的margin重叠了：

由`第2点`可知：两个不同`BFC环境`的盒子，他们两的`margin`才不会重叠，那么我们只需触发`box3`的BFC就行

![在这里插入图片描述](https://img-blog.csdnimg.cn/01946263466e4380bb440d34a7e15a1e.png)

```css
 .box3 {
        margin-top: 10px;
        width: 100px;
        height: 100px;
        background-color: yellow;
        float: left;
    }
```

### 5.浮动元素与BFC盒子不重叠

```css
<div class="box2 w"></div>
<div class="box3 w"></div>

.w {
        width: 100px;
        height: 100px;
    }

.box2 {
        float: left; // 触发BFC
        background: red;
    }

.box3 {
        background: green;
    }

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/0516f575577e442092cdace129ebd955.png)

由`第4点`可知：`float盒子`与`BFC盒子`不重叠，所以我们只需要把绿色盒子设置为`BFC盒子`就行

![在这里插入图片描述](https://img-blog.csdnimg.cn/fdfbe748c110455fa4af5bb2f845b72f.png)

```css
.box3 {
        background: green;
        overflow:hidden // 触发BFC
    }
```

### 6.利用BFC清除浮动

由`第5点`可知：`BFC盒子`会把内部的`float盒子`算进高度中，这也是为什么可以通过给父级盒子设置`float: left` `position: absolute` `overflow: hidden`来解决浮动的高度塌陷问题，因为这些做法都使父级盒子变成一个`BFC盒子`，而`BFC盒子`会把内部的`float盒子`算进高度，顺势解决了高度塌陷问题




