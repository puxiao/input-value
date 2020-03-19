# CHANGELOG

## v0.1.10

1. 修复 anysicPunctuation函数中多余的赋值问题。
将return item = '\\\' + item; 这行代码修改为 return '\\\' + item;

## v0.1.9

1. 修复 如果参数为null或undefined情况下报错的问题。
