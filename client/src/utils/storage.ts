const storage = localStorage;

export const getItem = (key: string) => {
    try {
        const value = storage.getItem(key);
        return value ? JSON.parse(value) : '';
    } catch (e) {}
};
export const setItem = (key: string, value: any) => {
    try {
        const json = JSON.stringify(value);
        storage.setItem(key, json);
    } catch (e) {}
};
export const removeItem = (key: string) => {
    try {
        storage.removeItem(key);
    } catch {}
};
