// 计算两个日期之间的差值
export function getDiffDay(date_1: string, date_2: string) {
    let totalDays, diffDate;
    let myDate_1 = Date.parse(date_1);
    let myDate_2 = Date.parse(date_2);
    diffDate = Math.abs(myDate_1 - myDate_2);
    totalDays = Math.floor(diffDate / (1000 * 3600 * 24));
    return totalDays;
}