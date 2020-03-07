# input-value

## 概述

常见的输入值校验和替换操作，主要针对中国大陆地区的校验规则。
例如针对用户登录或注册时填写的信息进行校验，或者其他场景下可能用到的输入值校验。

全部方法如下：

    - isNum,isInt,isPInt,isNInt,checkIntRange
    - isTel,isFax,isEmail,isQQ,isURL,isIP,isIPv6,isIDCard,isPostCode
    - same,lengthRange,letterBegin,pureNum,getLIPTypes,pureLIP
    - clearSpaces,clearCNChars,clearCNCharsAndSpaces,clearPunctuation,
    - haveSpace,haveCNChars

注意：

- 绝大多数的方法返回值为 true or false
- getLIPTypes方法返回值为0-3


## 示例代码

使用场景1：用户注册时，用户名不能包含空格，可以使用以下代码进行校验：

    const valuetest = require('input-value');  
    let username = 'abc d';  
    console.log(valuetest.haveSpace(username)); //true  校验到有空格后，可提醒用户  

    //或者我们直接清除掉用户输入中的空格  
    username = valuetest.clearSpaces(username); //abcd  

使用场景2：用户密码规范中要求，密码为字母、数字、标点符号(空格除外)，并且构成中至少包含其中的2种。

可以使用以下代码进行校验：

    const valuetest = require('input-value');  
    let password = 'abc123';  
    console.log(valuetest.pureLIP(password,2)); //true  
    console.log(valuetest.pureLIP(password,3)); //false 若参数为3表示构成种类必须全部包含字母、数字和标点符号  



## 参数约定

- value：类型为Number的参数

- str：类型为String的参数

- floats：小数点后的位数

- minLength：数字或字符的最小长度或固定长度，若不设置则表示不限制

- maxLength：数字或字符的最大长度，若不设置则表示不限制(JS中最大整数为9007199254740991)

- minInt：在取值范围中，最小的整数

- maxInt：在取值范围中，最大的整数，若不设置则表示不限制

- punctuation：除空格外的其他英文标点符号集：~`!@#$%^&*()-_+=\[]{};:"\',<.>/?。  若需自定义符号集，例如“仅包含中划线和下划线”，将参数设置为"\-\_"即可。


## 全部方法(API)

### isNum(value,floats=null)

校验是否为一个数字，以及该数字小数点位数是否与参数floats一致。

校验规则：

- 若参数floats有值，则校验该数字小数点后的位数。
- 若参数floats没有值，则仅仅校验是否为数字。

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.isNum(2)); //true  
    console.log(valuetest.isNum(2.123)); //true  
    console.log(valuetest.isNum(2.123,2)); //false  
    console.log(valuetest.isNum(2.123,3)); //true  

    //注意：由于String(2.0)为'2'，并非'2.0'，所以小数点后全部为0的校验结果会和预期的不一致，比如  
    console.log(valuetest.isNum(2.0,1)); //false  


### isInt(value,minLength=null,maxLength=undefined)

校验是否为一个整数。

校验规则：

- 若参数minLength和maxLength均为null或undefined，则仅仅校验参数value是否为整数。
- 若参数minLength有值、maxLength为undefined，则校验该整数的位数是否等于minLength
- 若参数minLength有值、maxLength为null，则校验该整数的位数是否大于等于minLength
- 若参数minLength和maxLength均有值，则校验该整数的位数是否大于等于minLength，并且小于等于maxLength。

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.isInt(123)); //true  
    console.log(valuetest.isInt(123,2)); //false  
    console.log(valuetest.isInt(123,2,null)); //true  
    console.log(valuetest.isInt(123,3)); //true  
    console.log(valuetest.isInt(123,1,4)); //true  


### isPInt(value,minLength=null,maxLength=undefined)

校验是否为非零的正整数。 参数使用方法和isInt()相同。


#### isNInt(value,minLength=null,maxLength=undefined)

校验是否为非零的负整数。 参数使用方法和isInt()相同。


### checkIntRange(value,minInt,maxInt=9007199254740991)

校验整数是否在取值范围内。

校验规则：

- minInt为在取值范围中最小的整数
- maxInt为在取值范围中最大的整数

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.checkIntRange(2,2)); //true  
    console.log(valuetest.checkIntRange(2,3)); //false  
    console.log(valuetest.checkIntRange(2,1,3)); //true  


### isTel(value)

校验是否为中国大陆手机号。 参数value可以是数字或字符串。

校验规则：

- 总长度为11位
- 不能以10/11/12作为开头(这3个号段暂时不存在)

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.isTel('15800000000')); //true  
    console.log(valuetest.isTel('11000000000')); //false  


### isFax(str)

校验是否为中国大陆传真或固定电话号码。 

校验规则：

- 区号为3-4位
- 号码为7-8位
- 没有区号，仅有号码也可以
- 区号和号码之间可以存在“-”

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.isFax('037188888888')); //true  
    console.log(valuetest.isFax('0371-88888888')); //true  
    console.log(valuetest.isFax('012-8888888')); //true  


### isEmail(str)

校验是否为邮箱地址

校验规则：

- 邮箱用户名中可以出现-(中划线)或_(下划线)
- 邮箱域名后缀不限
- 邮箱域名可为IP地址

示例代码：

    const valuetest = require('input-value');   
    console.log(valuetest.isEmail('xx@ab.xx')); //true  
    console.log(valuetest.isEmail('xx@ab.cd.xx')); //true  


### isQQ(value)

校验是否为QQ号码。 参数value为数字或字符串

校验规则：

- 非0开头的5位-13位整数

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.isQQ('78657141')); //true  
    console.log(valuetest.isQQ('1234')); //false  
    console.log(valuetest.isQQ('12345678901234')); //false  


### isURL(str)

校验是否为网址。

校验规则：

- 以https://、http://、ftp://、rtsp://、mms://开头、或者没有这些开头
- 可以没有www开头(或其他二级域名)，仅域名
- 网页地址中允许出现/%*?@&等其他允许的符号

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.isURL('puxiao.com')); //true  
    console.log(valuetest.isURL('https://www.puxiao.com/mynpm/index.html?url=https://npmjs.com')); //true  

### isIP(str)

校验是否为不含端口号的IP地址。

校验规则：

- IP格式为xxx.xxx.xxx.xxx，每一项数字取值范围为0-255
- 除0以外其他数字不能以0开头，比如02

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.isIP('256.02.0.0')); //false 256和02均不在允许范围内  


### isIPv6(str)

校验是否为IPv6地址。

校验规则：

- 支持IPv6正常格式
- 支持IPv6压缩格式

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.isIPv6('2001:0410:0000:0000:FB00:1400:5000:45FF')); //true  
    console.log(valuetest.isIPv6('2001:0410::FB00:1400:5000:45FF')); //true  


### isIDCard(str)

校验是否为中国大陆第二代居民身份证。

校验规则：

- 共18位，最后一位可为X(大小写均可)
- 不能以0开头
- 出生年月日会进行校验：年份只能为18/19/2*开头，月份只能为01-12，日只能为01-31

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.isIDCard('410000179913320000')); //false 出生年月日不符合校验规则  


### isPostCode(value)

校验是否为中国大陆邮政编码。 参数value为数字或字符串

校验规则：

- 共6位，且不能以0开头

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.isPostCode('12345')); //false 必须为6位  


### same(firstValue,secondValue)

校验两个参数是否完全相同，包括类型。

校验规则：

- 值相同，数据类型也相同

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.same(2,'2')); //false 数据类型不同  


### lengthRange(str,minLength,maxLength=9007199254740991)

校验字符的长度是否在规定的范围内。 

校验规则：

- minInt为在取值范围中最小的长度
- maxInt为在取值范围中最大的长度

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.lengthRange('abcd',3)); //true  字符长度需>=3  
    console.log(valuetest.lengthRange('abcd',5)); //false  字符长度需>=5  
    console.log(valuetest.lengthRange('abcd',3,5)); //true  字符长度需>=3、<=5  


### letterBegin(str)

校验字符是否以字母开头。

校验规则：

- 必须以字母开头
- 开头的字母不区分大小写

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.letterBegin('abc')); //true  
    console.log(valuetest.letterBegin('0abc')); //false  


### pureNum(str)

校验字符是否为纯数字(整数)。

校验规则：

- 字符全部为正整数(包含0)
- 可以以0开头

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.pureNum('0123')); //true  
    console.log(valuetest.pureNum('01a23')); //false  


### getLIPTypes(str,punctuation=null)

返回字符串构成种类(字母，数字，标点符号)的数量。 

LIP缩写的由来：L(letter 字母) + I(uint 数字) + P(punctuation 标点符号)

参数punctuation的说明：

- punctuation指可接受的标点符号集

- 若需自定义符号集，例如“仅包含中划线和下划线”，将参数设置为"\-\_"即可

- **若不传值或默认为null，则内部默认标点符号集为除空格外的其他英文标点符号：~\`!@#$%^&*()-_+=\[]{};:"\',<.>/?**

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.getLIPTypes('abc')); //1  
    console.log(valuetest.getLIPTypes('abc123')); //2  
    console.log(valuetest.getLIPTypes('abc123=?')); //3  

    console.log(valuetest.getLIPTypes('abc123=?','\-\_')); //2  第2个参数'\-\_'表明可接受的标点符号仅为\-\_，而=?不在此范围里  


### pureLIP(str,num=1,punctuation=null)

校验字符串构成的种类数量是否大于或等于参数num的值。 通常用来校验用户设置的密码复杂程度。

校验规则：

- 参数num为需要构成的种类(字母、数字、标点符号)，该值只能是1-3。
- 默认参数num的值为1，即表示：至少包含字母，数字，标点符号中的1种
- 若参数num的值为2，即表示：至少包含字母，数字，标点符号中的2种
- 若参数num的值为3，即表示：必须同时包含字母，数字，标点符号
- 参数punctuation指可接受的标点符号集，具体设定可参考getLIPTypes()方法中关于标点符号集的解释。

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.pureLIP('abc',2)); //false  传递的参数num=2，需要至少包含字母、数字、标点符号中的2种  
    console.log(valuetest.pureLIP('abc123',2)); //true  
    console.log(valuetest.pureLIP('abc123-',2)); //true  字符串的构成至少包含2种，而'abc123-'是3种组成，因此返回true  
    console.log(valuetest.pureLIP('abc123-',3)); //true  
    console.log(valuetest.pureLIP('abc123=',3,'-_')); //false  由于传递参数中可接受标点符号仅为'-_'，而'='不在此范围内 


### clearSpaces(str)
清除所有空格。

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.clearSpaces(' a bc  ')); //abc  


### clearCNChars(str)
清除所有中文字符(包括中文标点符号)。

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.clearCNChars('abc杨')); //abc  


### clearCNCharsAndSpaces(str)
清除所有中文字符及空格。

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.clearCNCharsAndSpaces(' a b c杨  ')); //abc  


### clearPunctuation(str,excludePunctuation=null)
除保留标点符号集以外，清除其他所有英文的标点符号(含空格)。 全部英文标点符号为： ~\`!@#$%^&*()-_+=\[]{};:"\',<.>/?

参数excludePunctuation指需要保留的标点符号集，例如若传递的值为'\_'，即表示清除_以外的其他所有英文标点符号。

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.clearPunctuation(' a b c, _ ?')); //abc  清除掉所有的标点符号(含空格)  
    console.log(valuetest.clearPunctuation(' a b c, _ ?','_')); //abc_ 清除_以外的其他全部标点符号(含空格)  


### haveSpace(str)
校验是否包含空格。

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.haveSpace(' a b c')); //true  
    console.log(valuetest.haveSpace('abc')); //false  


### haveCNChars(str)
校验是否包含中文字符(包括中文标点符号)。

示例代码：

    const valuetest = require('input-value');  
    console.log(valuetest.haveCNChars('abc杨')); //true  


## 反馈

若您在使用中发现有任何bug或建议，可反馈给我，邮箱：yangpuxiao@gmail.com
