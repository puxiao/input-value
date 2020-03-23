# CHANGELOG

## v0.1.11

1. 新增startByLetter(str)替代letterBegin(str)。 letterBegin(str)并未删除，暂时保留。
2. 新增startBy(str,keyword,escape=true)函数：校验是否以某字符串为开头。
3. 新增endBy(str,keyword,escape=true)函数：校验是否以某字符串为结尾。


## v0.1.10

1. 修复 anysicPunctuation函数中多余的赋值问题。
将return item = '\\\\' + item; 这行代码修改为 return '\\\\' + item;

## v0.1.9

1. 修复 如果参数为null或undefined情况下报错的问题。
