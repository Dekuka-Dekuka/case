async function getData(url, headers) {
    const response = await fetch(url, headers);
    return await response.json();
}

module.exports = getData;