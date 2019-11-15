# 面试题

## 第一题

### 用js实现随机选取10--100之间的10个数字，存入一个数组，并排序和去重（保证这10个数字不能出现重复）

请完善下面的题目
```javascript
            function generateTenNumbers1() {
              let arr = [];
              function getnumber() {
                const num = Math.floor(Math.random()*91) + 10;
                if (!arr.includes(num)) {
                  arr.push(num)
                }
                if (arr.length >= 10) {
                  return arr ; 
                } else {
                  return getnumber()
                }
              }
              getnumber();
              return arr.sort((a, b) => {
                  return a-b;
              });
            }
            const arr = generateTenNumbers1();
```

## 第二题

给定一个编码字符，按编码规则进行解码，输出字符串。编码规则是`count[letter]`，将letter的内容count次输出，count是0或正整数，letter是区分大小写的纯字母

示例：
```javascript
const s = '3[a]2[bc]'; decodeString(s); // 返回'aaabcbc'
```
请完善下面的题目
```javascript
function decodeString(str){
    //若不存在[ 返回当前字符串
    if(str.indexOf('[')==-1){
        return str
    }
    //正则表示 整数[字符串] 并提取出所有匹配字符串
    let list=str.match(/(\d+)(\[([a-z]|[A-Z])+\])/g)
    list.map((el)=>{
        //el为所有匹配字符串
        let start = el.indexOf('[')
        let end = el.indexOf(']')
        let num = el.substring(0,start)//次数
        let char = el.substring(s+1,end)//字符
        let charStr = num > 1 ? char.reapeat(Nmuber(num)) : char;
        str=str.replace(el,charStr)//替换原字符串的匹配内容成新字符串
    })
    return decodeString(str);//再次重新解读新字符串
}
console.log('9[a]7[b]')
```

## 第三题

基于 React 框架写一个列表，列表每项有一个删除该项的功能。

请完善下面的题目

```javascript
'use strict';

import React, { Component } from 'react';

// 单项
class Item extends Component{
    constructor(props){
        super(props)
        this.state = {};
        console.log(props.data)
    }
    //删除 回调父组件函数
    delete(){
        this.props.delete()
    }
    render(){
        return (
            <div>
                <span>内容{this.props.data.li}{this.props.data.i}</span>
                <a href='#' onClick={this.delete.bind(this)}>删除</a>
            </div>
        )
    }
}

// 列表
class List extends Component{
    state={
        //10个元素的空字符串数组
        list:new Array(10).fill('')
    }
    constructor(props){
        super(props)
    }
    //删除数组指定位置元素
    delete(i){
        let { list }=this.state
        list.splice(i, 1);
        this.setState({list:list})
    }
    render(){
      const { list } = this.state
        return (
            <div>
                <h1>List</h1>
                {
                   list.map((elt,index)=>{
                        return (
                            <Item key={index} data={{li:elt,i:index}} delete={this.delete.bind(this, index)} />
                        )
                    })
                }
            </div>
        )
    }
}
```

