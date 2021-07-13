## Vue.set

### 官方文档

[Vue.set( target, propertyName/index, value )](https://cn.vuejs.org/v2/api/#Vue-set)

- **参数**：

  - `{Object | Array} target`
  - `{string | number} propertyName/index`
  - `{any} value`

- **返回值**：设置的值。

- **用法**：

  向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)

  注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。

### 使用方法

Vue 无法检测到对象属性的添加和删除。对于已经创建的实例，Vue 不能动态添加根级别的
响应式属性，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。
object：要更改的数据源(可以是对象或者数组)
key：要更改的具体数据
value ：重新赋的值

```js
<template>
    <div>
        <p v-for="item in items" :key="item.id">{{item.name}}</p>
        <button @click="updateItem()">updateItem</button>
        <button @click="insertItem()">insertItem</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            items:[
                {name:"I'm the first",id:'1'},
                {name:"I'm the second",id:'2'},
                {name:"I'm the third",id:'3'},
            ]
        }
    },
    methods:{
        updateItem(){
            this.$set(this.items,0,{name:"I'm the update",id:"10"})
        },
        insertItem(){
            var itemLength = this.items.length
            this.$set(this.items,itemLength,{name:"I'm the insert",id:"bugaosuni"})
        }
    }
}
</script>
```



此时的界面为：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200923163041662.png#pic_center)
当我们点击第一个按钮后。调用methods中的updateItem方法。此时"I’m the first"修改为"I’m the update"。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200923163159323.png#pic_center)
当我们点击第二个按钮，向items数组中添加了数据：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200923163429754.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200923163412748.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0Fpb2xpbXA=,size_16,color_FFFFFF,t_70#pic_center)