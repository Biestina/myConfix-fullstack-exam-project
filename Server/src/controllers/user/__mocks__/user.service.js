const userService = jest.mock('../user.service.js');

let mockData;

userService.findAll = jest.fn(() => Promise.resolve(mockData));

userService.findById = jest.fn(id => Promise.resolve(mockData.find(p => p.id === id)));

userService.create = jest.fn(user => {
  const savedUser = {
    ...user,
    id: mockData[mockData.length - 1].id + 1,
    configs: [],
    role: "USER"
  };
  mockData.push(savedUser);
  return Promise.resolve(savedUser);
});

userService.__setMockData = data => {
  mockData = data;
}

module.exports = userService;