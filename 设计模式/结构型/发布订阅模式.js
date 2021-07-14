//1.创建一个对象(缓存列表)
let events = {
    list: {},
    //2.on方法用来把回调函数fn都加到缓存列表中
    on(key, fn) {
        // 如果对象中没有对应的key值
        // 也就是说明没有订阅过
        // 那就给key创建个缓存列表
        if (!this.list[key]) {
            this.list[key] = [];
        }
        // 把函数添加到对应key的缓存列表里
        this.list[key].push(fn);
    },
    //3.emit方法取到arguments里第一个当做key，根据key值去执行对应缓存列表中的函数
    emit() {
        // 第一个参数是对应的key值
        // 直接用数组的shift方法取出
        let key = [].shift.call(arguments),
            fns = this.list[key];
        // 如果缓存列表里没有函数就返回false
        if (!fns || fns.length === 0) {
            return false;
        }
        // 遍历key值对应的缓存列表
        // 依次执行函数的方法
        fns.forEach(fn => {
            fn.apply(this, arguments);
        });
    },
    //4.remove方法可以根据key值取消订阅
    remove(key, fn) {
        // 这回我们加入了取消订阅的方法
        let fns = this.list[key];
        // 如果缓存列表中没有函数，返回false
        if (!fns) return false;
        // 如果没有传对应函数的话
        // 就会将key值对应缓存列表中的函数都清空掉
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            // 遍历缓存列表，看看传入的fn与哪个函数相同
            // 如果相同就直接从缓存列表中删掉即可
            fns.forEach((cb, i) => {
                if (cb === fn) {
                    fns.splice(i, 1);
                }
            });
        }
    }
};

function cat() {
    console.log('一起喵喵喵');
}

function dog() {
    console.log('一起旺旺旺');
}

events.on('pet', data => {
    console.log('接收数据');
    console.log(data);
});
events.on('pet', cat);
events.on('pet', dog);
// 取消dog方法的订阅
events.remove('pet', dog);
// 发布
events.emit('pet', ['二哈', '波斯猫']);
/*
    接收数据
    [ '二哈', '波斯猫' ]
    一起喵喵喵
*/

/* 
    优点：
    1.对象之间的解耦
    2.异步编程中，可以更松耦合的代码编写
    缺点：
    1.创建订阅者本身要消耗一定的时间和内存
    2.多个发布者和订阅者嵌套一起的时候，程序难以跟踪维护
    */