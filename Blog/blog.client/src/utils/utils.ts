export const convertDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString() + " " + dateObj.toLocaleTimeString();
}