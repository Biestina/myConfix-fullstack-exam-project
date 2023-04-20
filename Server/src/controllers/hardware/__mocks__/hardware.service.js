const hardwareService = jest.mock('./hardware.service');

let mockData;


hardwareService.findAll = jest.fn(() => Promise.resolve(mockData));


hardwareService.findById = jest.fn(id => Promise.resolve(mockData.find(p => p.id === id)));


hardwareService.create = jest.fn(hardware => {
  const savedHardware = {
    ...hardware,
    id: mockData[mockData.length - 1].id + 1
  };
  mockData.push(savedHardware);
  return Promise.resolve(savedHardware);
})


hardwareService.update = jest.fn((id, hardwareData) => {
  const hardwareToUpdate = mockData.find(p => p.id === id);
  const updatedHardware = {
    ...hardwareToUpdate,
    ...hardwareData
  };
  const modifiedArr = mockData.splice(indexOf(hardwareToUpdate), 1, updatedHardware);
  return Promise.resolve(modifiedArr);
})


hardwareService.delete = jest.fn(id => {
  const dataToDelete = mockData.find(p => p.id === id);
  const modifiedArr = mockData.splice(indexOf(dataToDelete), 1);
  return Promise.resolve(modifiedArr);
});

hardwareService.__setMockData = data => {
  mockData = data;
}

module.exports = hardwareService;