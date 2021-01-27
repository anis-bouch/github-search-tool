/**
 * @returns a truncated text or an original text
 * @param text a string to truncate if it's length is above 30 caracters. 
 * 
 */
export function truncateBiggerText(text: string) {
    return text.length > 30 ? text.substr(0, 30).concat('...') : text;
}

/**
 * 
 * @param func a call back function 
 * @param wait the wait time
 */
export function debounce<F extends Function>(func: F, wait: number): F {
    let timeoutID: number;
  
    if (!Number.isInteger(wait)) {
      wait = 300;
    }
  
    // conversion through any necessary as it wont satisfy criteria otherwise
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutID);
      const context = this;
  
      timeoutID = window.setTimeout(function () {
        func.apply(context, args);
      }, wait);
    } as any;
  }
  