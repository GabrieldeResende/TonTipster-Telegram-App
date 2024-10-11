export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
}

export const withoutTime = (date: Date) => {
    let newDate = new Date(date)
    newDate.setHours(0, 0, 0, 0)
    return newDate;
}