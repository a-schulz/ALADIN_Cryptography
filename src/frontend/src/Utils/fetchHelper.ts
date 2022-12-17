export const fetchJson = async (url: string, init = {}) => {
    const res = await fetch(url, init);
    if (!res.ok) {
        throw new Error(`${res.status}: ${await res.text()}`);
    }
    return res.json();
}


export const fetchAndSetAll = async (collection: {url:string, setter:any}[]) => {
    // fetch all data first
    const allData = await Promise.all(
        collection.map(({ url}) => fetchJson(url))
    );

    // iterate setters and pass in data
    collection.forEach(({ setter }, i) => {
        setter(allData[i]);
    });
};