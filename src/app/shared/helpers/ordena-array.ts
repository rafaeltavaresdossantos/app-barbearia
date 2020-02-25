export const ordenaArrayCrescente = chave => array => {
    return array.sort((a, b) => {
        if (typeof a[chave] === 'boolean') {
            return ((a[chave] === b[chave]) ? 0 : a[chave] ? 1 : -1);
        }
        return a[chave] < b[chave] ? -1 : a[chave] > b[chave] ? 1 : 0;
    });
};

export const ordenaArrayDecrescente = chave => array => {
    return array.sort((a, b) => {
        if (typeof a[chave] === 'boolean') {
            return ((a[chave] === b[chave]) ? 0 : a[chave] ? -1 : 1);
        }
        return a[chave] < b[chave] ? 1 : a[chave] > b[chave] ? -1 : 0;
    });
};
