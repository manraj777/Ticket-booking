export function getRandomNumber(length: number) {
    let result = '';
    const numbers = '0123456789';
    for (let i = 0; i < length; i++) {
        result += numbers.charAt(Math.floor(Math.random() * 10));
    }
    return result;
}