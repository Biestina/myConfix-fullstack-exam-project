const configService = jest.mock('./config.service');

let mockData;

//* CREATE
configService.create = jest.fn(config => {
  const savedConfig = {
    ...config,
    id: mockData[mockData.length - 1].id + 1
  };
  mockData.push(savedConfig);
  return Promise.resolve(savedConfig);
});


//* FINDBYID
configService.findById = jest.fn(id => {
  return Promise.resolve(mockData.find(c => c.id === id));
});


//TODO refact
//* UPDATE
configService.update = jest.fn((id, configData) => {
  return Promise.resolve(mockData.find(c => c.id === id).map(c => c = {...c, configData}))
});

//TODO refact
//* DELETE
configService.delete = jest.fn(id => {
  const dataToDelete = mockData.find(c => c.id === id);
  const modifiedArr = mockData.splice(indexOf(dataToDelete), 1);
  console.log(modifiedArr);
  console.log('modifiedArr');
  return Promise.resolve(`Deleted config with id ${id}`)
});


configService.__setMockData = data => {
  mockData = data;
}

module.exports = configService;
