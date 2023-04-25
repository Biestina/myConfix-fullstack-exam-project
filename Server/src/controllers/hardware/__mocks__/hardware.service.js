const hardwareService = jest.mock('./hardware.service');

let mockData;

hardwareService.findAll = jest.fn(() => Promise.resolve(mockData));
hardwareService.findById = jest.fn(id => Promise.resolve(mockData.find(p => p.id === id)));

hardwareService.__setMockData = data => {
  mockData = data;
}

module.exports = hardwareService;