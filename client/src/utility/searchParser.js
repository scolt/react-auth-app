export const parser = () => {
    const queryString = window.location.search;
    const parsedObject = {};
    queryString.replace('?', '').split('&').map(item => {
        const temporary = item.split('=');
        parsedObject[temporary[0]] = temporary[1];
    });
    return parsedObject;
};

export const stripQueryParams = () => {
    if (window.location.search) window.location.href = '/';
};