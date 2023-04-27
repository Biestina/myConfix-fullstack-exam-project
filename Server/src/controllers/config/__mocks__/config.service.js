const configService = jest.mock('./config.service.js');

let mockData = [];
let mockDataUser = [];

configService.create = jest.fn((configData, userId) => {
  const savedConfig = {
    ...configData,
    id: mockData[mockData.length - 1].id + 1
  };
  const user = mockDataUser.find(u => u.id === userId);
  user.configs.push(savedConfig);

  mockData.push(savedConfig);
  return Promise.resolve(savedConfig);
});

configService.findAll = jest.fn(userId => {
  return Promise.resolve(mockDataUser.find(u => u.id === userId).configs);
});

configService.findById = jest.fn(configId => {
  return Promise.resolve(mockData.find(c => c.id === configId));
});

configService.update = jest.fn((id, configData) => {
  const configToUpdate = mockData.find(c => c.id === id);
  const updatedConfig = {
    ...configToUpdate,
    ...configData
  };
  const modifiedArr = mockData.splice(indexOf(configToUpdate), 1, updatedConfig);
  return Promise.resolve(modifiedArr);
});

configService.delete = jest.fn(id => {
  const configToDelete = mockData.find(c => c.id === id);
  const user = mockDataUser.find(u => u.id === configToDelete.related_user);
  user.configs.splice(indexOf(configToDelete), 1);
  const modifiedArr = mockData.splice(indexOf(configToDelete), 1);
  return Promise.resolve(modifiedArr);
});


configService.__setMockData = data => mockData = data;
configService.__setMockDataUser = data => mockDataUser = data;

module.exports = configService;