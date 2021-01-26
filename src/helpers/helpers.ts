/**
 * @returns a truncated text or an original text
 * @param text a string to truncate if it's length is above 30 caracters. 
 * 
 */
export function truncateBiggerText(text: string) {
    return text.length > 30 ? text.substr(0, 30).concat('...') : text;
}