const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const userController = require('./user.controller');
const userService = require('./user.service');
jest.mock('./user.service.js');

describe('UserController tests', () => {

  let mockData;
  let response;
  let nextFunction;

  beforeEach(() => {
    mockData = [{
      "id": 1,
      "email": "test@test.hu",
      "password": "test",
      "role": "USER",
      "configs": []
    }, {
      "id": 2,
      "email": "test2@test.com",
      "password": "test2",
      "role": "USER",
      "configs": []
    }];

    userLog = {
      "email": "tester@tester.com",
      "password": "tester",
    };

    validSavedUser = {
      id: mockData[mockData.length - 1].id + 1,
      email: "tester@tester.com",
      password: "tester",
      role: "USER",
      configs: []
    };

    userService.__setMockData(mockData);
    response = mockResponse();
    nextFunction = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findAll() with valid data', async () => {
    const request = mockRequest();

    await userController.findAll(request, response, nextFunction);
    expect(userService.findAll).toBeCalled();
    expect(userService.findAll).toBeCalledTimes(1);
    expect(response.json).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith(mockData);
    expect(nextFunction).not.toBeCalled();
  });

  test('findAll() with invalid data', async () => {
      const request = mockRequest();
      userService.findAll.mockRejectedValueOnce('Database error (cannot find users)');
  
      await userController.findAll(request, response, nextFunction)
      expect(userService.findAll).toBeCalled();
      expect(userService.findAll).toBeCalledTimes(1);
      expect(nextFunction).toBeCalledTimes(1);
      expect(nextFunction).toBeCalledWith(createError(500,'Database error (cannot find users)'));
    });

  test('findById() with valid id', async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID
      }
    });

    await userController.findById(request, response, nextFunction);
    expect(userService.findById).toBeCalled();
    expect(userService.findById).toBeCalledTimes(1);
    expect(userService.findById).toBeCalledWith(VALID_ID);
    expect(response.json).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith(mockData.find(p => p.id === VALID_ID));
    expect(nextFunction).not.toBeCalled();
  });

  test('findById() with invalid id', async () => {
    const INVALID_ID = 999;
    const request = mockRequest({
      params: {
        id: INVALID_ID
      }
    });

    await userController.findById(request, response, nextFunction);
    expect(userService.findById).toBeCalled();
    expect(userService.findById).toBeCalledTimes(1);
    expect(userService.findById).toBeCalledWith(INVALID_ID);
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(createError(404, `User with id ${INVALID_ID} not found`));
  });

  test('create() with valid data', async () => {
    const request = mockRequest({
      body: userLog
    });

    await userController.create(request, response, nextFunction);
    expect(userService.create).toBeCalled();
    expect(userService.create).toBeCalledTimes(1);
    expect(response.json).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith(validSavedUser);
    expect(nextFunction).not.toBeCalled();
  });

});

