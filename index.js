function isNum(value,floats=null){
    if(!value) return false;
    let regexp = new RegExp(`^[1-9][0-9]*.[0-9]{${floats}}$|^0.[0-9]{${floats}}$`);
    return typeof value === 'number' && floats?regexp.test(String(value)):true;
}

function anysicIntLength(minLength,maxLength){
    let result_str = '';
    if(minLength){
        switch(maxLength){
            case undefined:
                result_str = result_str.concat(`{${minLength-1}}`);
                break;
            case null:
                result_str = result_str.concat(`{${minLength-1},}`);
                break;
            default:
                result_str = result_str.concat(`{${minLength-1},${maxLength-1}}`);
        }
    }else{
        result_str = result_str.concat('*');
    }

    return result_str;
}

function isInt(value,minLength=null,maxLength=undefined){
    if(!isNum(value)) return false;
    let regexp = new RegExp(`^-?[1-9][0-9]${anysicIntLength(minLength,maxLength)}$`);
    return regexp.test(value.toString());
}

function isPInt(value,minLength=null,maxLength=undefined) {
    if(!isNum(value)) return false;
    let regexp = new RegExp(`^[1-9][0-9]${anysicIntLength(minLength,maxLength)}$`);
    return regexp.test(value.toString());
}

function isNInt(value,minLength=null,maxLength=undefined){
    if(!isNum(value)) return false;
    let regexp = new RegExp(`^-[1-9][0-9]${anysicIntLength(minLength,maxLength)}$`);
    return regexp.test(value.toString());
}

function checkIntRange(value,minInt,maxInt=9007199254740991){
    return Boolean(isInt(value) && (Boolean(minInt!=undefined && minInt!=null)?value>=minInt:true) && (value<=maxInt));
}

function isTel(value) {
    if(!value) return false;
    return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
}

function isFax(str) {
    if(!str) return false;
    return /^([0-9]{3,4})?[0-9]{7,8}$|^([0-9]{3,4}-)?[0-9]{7,8}$/.test(str);
}

function isEmail(str) {
    if(!str) return false;
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str);
}

function isQQ(value) {
    if(!value) return false;
    return /^[1-9][0-9]{4,12}$/.test(value.toString());
}

function isURL(str) {
    if(!str) return false;
    return /^(https:\/\/|http:\/\/|ftp:\/\/|rtsp:\/\/|mms:\/\/)?[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(str);
}

function isIP(str) {
    if(!str) return false;
    return /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/.test(str);
}

function isIPv6(str){
    if(!str) return false;
    return Boolean(str.match(/:/g)?str.match(/:/g).length<=7:false && /::/.test(str)?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str):/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str));
}

function isIDCard(str){
    if(!str) return false;
    return /^[1-9][0-9]{5}(18|19|(2[0-9]))[0-9]{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)[0-9]{3}[0-9Xx]$/.test(str);
}

function isPostCode(value){
    if(!value) return false;
    return /^[1-9][0-9]{5}$/.test(value.toString());
}

function same(firstValue,secondValue){
    return firstValue===secondValue;
}

function lengthRange(str,minLength,maxLength=9007199254740991) {
    if(!str) return false;
    return Boolean(str.length >= minLength && str.length <= maxLength);
}

function letterBegin(str){
    if(!str) return false;
    return /^[A-z]/.test(str);
}

function pureNum(str) {
    if(!str) return false;
    return /^[0-9]*$/.test(str);
}

function anysicPunctuation(str){
    if(!str) return null;
    let arr = str.split('').map(item => {
        return '\\' + item;
    });
    return arr.join('|');
}

function getPunctuation(str){
    return anysicPunctuation(str) || '\\~|\\`|\\!|\\@|\\#|\\$|\\%|\\^|\\&|\\*|\\(|\\)|\\-|\\_|\\+|\\=|\\||\\\|\\[|\\]|\\{|\\}|\\;|\\:|\\"|\\\'|\\,|\\<|\\.|\\>|\\/|\\?';
}

function getExcludePunctuation(str){
    let regexp = new RegExp(`[${anysicPunctuation(str)}]`,'g');
    return getPunctuation(' ~`!@#$%^&*()-_+=\[]{};:"\',<.>/?'.replace(regexp,''));
}

function getLIPTypes(str,punctuation=null){
    if(!str) return 0;
    let p_regexp = new RegExp('['+getPunctuation(punctuation)+']');
    return /[A-z]/.test(str) + /[0-9]/.test(str) + p_regexp.test(str);
}

function pureLIP(str,num=1,punctuation=null){
    if(!str) return false;
    let regexp = new RegExp(`[^A-z0-9|${getPunctuation(punctuation)}]`);
    return Boolean(!regexp.test(str) && getLIPTypes(str,punctuation)>= num);
}

function clearSpaces(str){
    if(!str) return '';
    return str.replace(/[ ]/g,'');
}

function clearCNChars(str){
    if(!str) return '';
    return str.replace(/[\u4e00-\u9fa5]/g,'');
}

function clearCNCharsAndSpaces(str){
    if(!str) return '';
    return str.replace(/[\u4e00-\u9fa5 ]/g,'');
}

function clearPunctuation(str,excludePunctuation=null){
    if(!str) return '';
    let regexp = new RegExp(`[${getExcludePunctuation(excludePunctuation)}]`,'g');
    return str.replace(regexp,'');
}

function haveSpace(str) {
    if(!str) return false;
    return /[ ]/.test(str);
}

function haveCNChars(str){
    if(!str) return false;
    return /[\u4e00-\u9fa5]/.test(str);
}

module.exports = {
    isNum,isInt,isPInt,isNInt,checkIntRange,
    isTel,isFax,isEmail,isQQ,isURL,isIP,isIPv6,isIDCard,isPostCode,
    same,lengthRange,letterBegin,pureNum,getLIPTypes,pureLIP,
    clearSpaces,clearCNChars,clearCNCharsAndSpaces,clearPunctuation,
    haveSpace,haveCNChars
}