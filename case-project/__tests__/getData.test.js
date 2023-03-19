const getData = require('../test-functions/getData');


test('getData function returns the expected data', async () => {
    const mockData = { foo: 'bar' };
    const mockResponse = {
      json: jest.fn().mockResolvedValue(mockData)
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    
    const url = 'https://example.com';
    const headers = { Authorization: 'Bearer token' };
    const data = await getData(url, headers);
    
    expect(fetch).toHaveBeenCalledWith(url, headers);
    expect(mockResponse.json).toHaveBeenCalled();
    expect(data).toEqual(mockData);
});