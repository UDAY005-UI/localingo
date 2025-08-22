let requestCount = 0;
export const REQUEST_LIMIT = 500;

export const getCount = () => requestCount;
export const incrementCount = () => { requestCount++ };
export const resetCount = () => { requestCount = 0; };
