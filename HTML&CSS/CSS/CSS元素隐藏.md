## CSS元素隐藏

### display:none

1.DOM结构：浏览器不会渲染display：none的元素，不占据空间。
2.事件监听：无法进行DOM事件监听。
3.性能：动态改变此属性会引起重排，性能较差。
4.继承：不会被子元素继承，毕竟子元素也不会被渲染。
5.transition:transiton不支持display。

### visiblity：hidden

1.DOM结构：元素被隐藏，但是会渲染不会消失，占据空间。
2.事件监听：无法进行DOM事件监听。
3.性能：动态改变此属性会引起重绘，性能较高。
4.继承：会被子元素继承，子元素可以通过visibilty:visible来取消隐藏。
5.transition:visible会立即显示，隐藏时会延迟。

### opacity：0

1.DOM结构：透明度为100%，元素隐藏，占据空间。
2.事件监听：可以进行DOM事件监听。
3.性能：提升为合成层，不会触发重绘，性能较高。
4.继承：会被子元素继承，但是子元素不能使用opacity：1来取消隐藏。
5.transition:opacity可以延时和隐藏
