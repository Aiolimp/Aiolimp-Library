## 1.HTML基础

### 1.1 HTML5文档基本格式及HTML标记

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
</head>
<body>
</body>
</html>
```

1. <!doctype>标记
    位于文档最前面，使用html5的DOCTYPE声明，会触发浏览器以标准兼容模式来显示页面，浏览器才能将该网页作为有效的html文档。

```html
<!doctype html>
```

1. < html >标记
    该标记位于<!doctype>标记 之后，该标记意味着html文档的开始和结束，在它之间的是文档的头部和主体内容。
2. < head >标记
    在< html >标记 之后，定义html文档的头部信息，也称头部标记。
3. < body >标记
    主体标记
4. html中的单双标记

- 双标记

```html
<标记名>内容</标记名>
```

- 单标记

```html
<标记名/>
```

1. 注释标记

```html
<!--注释语句-->
<!--这就是注释标记-->
```

### 1.2 HTML5的语法

1. 标签不区分大小写

```html
<p>这里的p标签大小写不一致</P>
```

虽然p标记的开始标记与结束标记大小写并不匹配，但是在html5中语法是完全合法的。

1. 允许属性值不使用引号

```html
<input checked=a type=checkbox/>
<input readonly=readonly type=text/>
```

以上代码等价于

```html
<input checked="a" type="checkbox"/>
<input readonly="readonly" type="text"/>
```

1. 允许部分属性值的属性省略

```html
<input checked=“checked” type="checkbox"/>
<input readonly="readonly" type="text"/>
```

可以省略为：

```html
<input checked type="checkbox"/>
<input readonly type="text"/>
```

### 1.3 标记的属性

```html
<标记名 属性1="属性值1" 属性2="属性2"...>内容</标记名>
```

标记可以有多个属性且不分先后顺序
例如：

```html
<h1 align="center">内容</h1>
```

### 1.4 HTML5文档头部相关标记

这些标记通常都写在head标记内

1. 设置页面标题标记< title>

```html
<title>网页标题名称</title>
```

1. 定义页面元信息标记< meta/>
2. 引用外部文件标记< link>
3. 内嵌样式标记

## 2._文本控制标记

### 2.1 标题和段落标记

1.标题标记
 包括 < h1> ~ < h6 >

```html
<hn align="对齐方式">内容</hn>
```

left：设置标题文字左对齐（默认值）
 center：设置标题文字居中对齐
 right：设置标题文字右对齐

2.段落标记

```html
<p align="对齐方式">内容</p>
```

3.水平线标记 < hr/>

```html
<hr 属性="属性值"/>
```

| 属性名 | 含义                 | 属性值                                                     |
| ------ | -------------------- | ---------------------------------------------------------- |
| align  | 设置水平线的对齐方式 | 可选择left、right、 center 三种值，默认为left              |
| size   | 设置水平线的粗细     | 以像素为单位，默认为2像素                                  |
| color  | 设置水平线的颜色     | 可用颜色名称、十六进制#RGB、rgb(r, g. b)                   |
| width  | 设置水平线的宽度     | 可以是确定的像素值，也可以是浏览器窗口的百分比，默认为100% |

### 2.2 文本格式化标记

| 标记                             | 显示效果                                              |
| -------------------------------- | ----------------------------------------------------- |
| < b>< /b> 和 < strong>< /strong> | 文本以粗体方式显示(b定义文本粗体，strong定义强调文本) |
| < i>< /i> 和 < em>< /em>         | 文本以斜体方式显示(i定义斜体字，em定义强调文本)       |
| < s>< /s> 和 < del>< /del>       | 文本以加删除线方式显示(H5不赞成使用s)                 |
| < u>< /u> 和 < ins>< /ins>       | 文本以加下划线方式显示(H5不赞成使用s)                 |

## 3.图像标记

>常用的图像格式主要是GIF、JPG和PNG三种
>在网页中小图片如图标，按钮等建议使用GIF或PNG格式，透明图片建议使用PNG格式，类似照片的图片则建议使用JPG格式，动态图片建议使用GIF格式。

### 3.1_图像标记< img />

```html
<img src="图像URL"/>
```

| 属性   | 属性值 | 描述                                                       |
| ------ | ------ | ---------------------------------------------------------- |
| src    | url    | 图片的路径                                                 |
| alt    | 文本   | 图像不能显示时的替换文本                                   |
| title  | 文本   | 鼠标悬停时显示的内容                                       |
| width  | 像素   | 设置图像的宽度                                             |
| height | 像素   | 设置图像的高度                                             |
| border | 数字   | 设置图像边框的宽度                                         |
| vspace | 像素   | 设置图像顶部和底部的空白(垂直边距)                         |
| hspace | 像素   | 设置图像左侧和右侧的空白(水平边距)                         |
| slign  | left   | 将图像对齐到左边                                           |
| slign  | right  | 将图像对齐到右边                                           |
| slign  | top    | 将图像的顶端和文本的第一行文本对齐，其他文学居图像下方     |
| slign  | middle | 将图像的水平中线和文本的第一行文本对齐，其他文字居图像下方 |
| slign  | bottom | 将图像的底端和文本的第一行文本对齐，其他文学居图像下方     |

### 3.2_绝对路径和相对路径

1. **绝对路径**
    _
    **绝对路径就是网页上的文件或目录在硬盘上的真正路径**，如“D:\HTML5+CSS3\images\logo.gif",**或完整的网络地址**，如http://www.itcast.cn/images/logo,gif"。
    _
    **网页中不推荐使用绝对路径**，因为网页制作完成之后我们需要将所有的文件上传到服务器。就是说很有可能不存在“D:\HTML5+CSS3\images\logo.gif" 这样一个路径。
2. **相对路径**
    _
    相对路经就是相对于当前文件的路径，相对路径不带有盘符，通常是以HTML网页文件为起点，通过层级关系描述目标图像的位置。
    _
    总结起来，相对路径的设置分为以下3种:
    _
    (1) 图像文件和HTML文件位于同一文件夹:只需输入图像文件的名称即可，如< img src=“logo. gif” />
    _
    (2) 图像文件位于HTML文件的下一级文件夹：输入文件夹名和文件名，之间用”/“隔开，如< img src=“images/logo.gif”/>
    _
    (3) 图像文件位于html文件的上一级文件夹:在文件名之前加入"…/", 如果是上两级，则需要使用"…/…/“以此类推，如<img src=”…/…/logo.gif/>

## 4_超链接标记

```html
<a href="跳转目标" target="目标窗口的弹出方式">文本或图像</a>
```

- < a>标记用于定义超链接，href 和target 为其常用属性
- href：用于指定链接目标的url地址
- target：用于指定链接页面的打开方式 。其取值有_self、_blank两种，
   **_self意为在原窗口打开，_blank意为在新窗口打开**

### 5.列表元素

### 5.1 ul元素(无序)

```html
<ul>
    <li>无</li>
    <li>序</li>
    <li>列</li>
    <li>表</li>
</ul>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/4bd919c81d8f471a907bdbf5b673da0e.png)

5.2 ol元素(有序)

```html
<ol>
    <li>无</li>
    <li>序</li>
    <li>列</li>
    <li>表</li>
</ol>
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/e3075a4c6f2f4168a04de2b0b30632fb.png)

5.3 dl元素

```
<dl>
    <dt>前</dt>
    <dd>端</dd>
    <dd>学</dd>
    <dd>习</dd>
</dl>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/65f2f76511ef4e8b95bd8e64230e6b3b.png)



