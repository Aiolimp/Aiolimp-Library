//解决类与对象,对象与对象之间的耦合
let Observer = (function () {
  let _message = {};
  return {
    //注册接口,
    //1.作用:将订阅者注册的消息推入到消息队列
    //2.参数:所以要传两个参数,消息类型和处理动作,
    //3.消息不存在重新创建,存在将消息推入到执行方法.。

    regist: function (type, fn) {
      //如果消息不存在,创建
      if (typeof _message[type] === 'undefined') {
        _message[type] = [fn];
      } else {
        //将消息推入到消息的执行动作
        _message[type].push(fn);
      }
    },

    //发布信息接口
    //1.作用:观察这发布消息将所有订阅的消息一次执行
    //2.参数:消息类型和动作执行传递参数
    //3.消息类型参数必须校验
    fire: function (type, args) {
      //如果消息没有注册,则返回
      if (!_message[type]) return;
      //定义消息信息
      var events = {
          type: type, //消息类型
          args: args || {}, //消息携带数据
        },
        i = 0,
        len = _message[type].length;
      //遍历消息
      for (; i < len; i++) {
        //依次执行注册消息
        _message[type][i].call(this, events);
      }
    },

    //移除信息接口
    //1.作用:将订阅者注销消息从消息队列清除
    //2.参数:消息类型和执行的动作
    //3.消息参数校验
    remove: function (type, fn) {
      //如果消息动作队列存在
      if (_message[type] instanceof Array) {
        //从最后一个消息动作序遍历
        var i = _message[type].length - 1;
        for (; i >= 0; i--) {
          //如果存在该动作在消息队列中移除
          _message[type][i] === fn && _message[type].splice(i, 1);
        }
      }
    },
  };
})();

//测试用例
//1.订阅消息
Observer.regist('test', function (e) {
  console.log(e.type, e.args.msg);
});

//2.发布消息
Observer.fire('test', { msg: '传递参数1' });
Observer.fire('test', { msg: '传递参数2' });
Observer.fire('test', { msg: '传递参数3' });
