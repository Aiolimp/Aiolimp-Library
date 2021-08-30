//不改变原对象的基础上,给对象添加属性或方法

let decorator=function(input,fn){
    //获取事件源
    let input=document.getElementById(input);
    //若事件源已经绑定事件
    if(typeof input.onclick=='function'){
      //缓存事件源原有的回调函数
      let oldClickFn=input.onclick;
      //为事件源定义新事件
      input.onclick=function(){
        //事件源原有回调函数
        oldClickFn();
        //执行事件源新增回调函数
        fn();
      }
    }else{
      //未绑定绑定
      input.onclick=fn;
    }
  }
  
  //测试用例
  decorator('textInp',function(){
    console.log('文本框执行啦');
  })
  decorator('btn',function(){
    console.log('按钮执行啦');
  })
  