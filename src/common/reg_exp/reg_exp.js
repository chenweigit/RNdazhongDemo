/**
 * 正则验证
 * 
 */

const regExp = {
  Reg_TelNo: /^1[3|4|5|6|7|8|9]\d{9}$/, // 手机号
  Reg_Number: /^\d{6}$/, // 验证数字
  Reg_email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/, //邮箱
}

export {regExp}