// 计算两个日期之间的差值
export function getDiffDay(date_1: string, date_2: string) {
    let totalDays, diffDate;
    let myDate_1 = Date.parse(date_1);
    let myDate_2 = Date.parse(date_2);
    diffDate = Math.abs(myDate_1 - myDate_2);
    totalDays = Math.floor(diffDate / (1000 * 3600 * 24));
    return totalDays;
}

/*
*验证邮箱格式是否正确
*参数strEmail，需要验证的邮箱
*/
export function checkEmail(strEmail: string) {
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(strEmail)) {
        return false;
    }
    else {
        return true;
    }
}


import { notification } from 'ant-design-vue';
// 成功提示
export function successTips(msg: string) {
    notification["success"]({
        message: 'Success',
        description: msg,
    });
};
// 错误提示
export function errTips(msg: string) {
    notification["error"]({
        message: 'error',
        description: msg,
    });
};
// 警告提醒
export function warningTips(msg: string, duration = 4500) {
    notification["warning"]({
        message: 'warning',
        description: msg,
        duration: duration
    });
}