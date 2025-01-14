const compiler = require('vue-template-compiler');


// let { render } = compiler.compile(`<div>
//     <div slot="a">{{a}}}</div>
//     <div slot="b">{{b}}</div>
//     ooo
// </div>`);
// console.log(render); // {a:内容,b:内容,children:ooo}



// let {render} = compiler.compile(`
//     <div>
//         <slot name="a"></slot>
//         <slot name="b"></slot>
//         <slot></slot>
//     </div>
// `);
// console.log(render); // _t('a')   _t('b')  _t('default')


//============================================上面是普通插槽的演示==========下面是作用域插槽的演示=================================================


// 父组件中没有渲染
// let {render} = compiler.compile(`
//     <app>
//     <div slot-scope="msg" slot="footer">{{msg.a}}</div>
//     </app>
// `);
// console.log(render)
// fn: function(msg){return _c('div',{},[_v(_s(msg.a))])}


let {render} = compiler.compile(`
    <div><slot name="footer" a="1" b="2"></slot></div>
`);

console.log(render);
// with(this){return _c('div',[_t("footer",null,{"a":"1","b":"2"})],2)}




// 假如有 A B C D E  介个页面。 
// lru算法：每访问一个页面就向数组末尾添加这个页面，把数组里重复的这个页面删掉。这样就形成了 最近的就是最后一项  最久的就是第一个 的现象。
// 最近的就是最后一项  最久的就是第一个
[E,C,D,B,q]  // 假如最多只能放5个，那么q页面是最近访问的，那么此时q没有重复，但是数组只能放5个缓存页面，所以就删除最久的那个页面A。
