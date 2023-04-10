//TODO __mocks__ folder

const configService = jest.mock('./config.service');

let mockData;

configService.findById = jest.fn(id => {
  return Promise.resolve(mockData.find(p => p.id === id));
});

configService.create = jest.fn(config => {
  const savedConfig = {
    ...config,
    id: mockData[mockData.length - 1].id + 1
  };
  mockData.push(savedConfig);
  return Promise.resolve(savedConfig);
});



configService.__setMockData = data => {
  mockData = data;
}

module.exports = configService;
