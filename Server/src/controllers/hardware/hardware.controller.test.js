const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const hardwareController = require('./hardware.controller');
const hardwareService = require('./hardware.service');
jest.mock('./hardware.service.js');


describe('HardwareController tests', () => {
  let mockData;
  let response;
  let nextFunction;

  beforeEach(() => {
    mockData = [{
      "id": 1,
      "name": "AMD Ryzen 5 3600",
      "category": "Cpu",
      "price_usd": 199.99,
    }, {
      "id": 2,
      "name": "Corsair 4000D Airflow",
      "category": "Case",
      "price_usd": 99.99,
    }];

    validSavedHardware = {
      id: mockData[mockData.length - 1].id + 1,
      name: "MeshCool",
      category: "Case",
      price: 99.99,
    };

    hardwareService.__setMockData(mockData);
    response = mockResponse();
    nextFunction = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findAll() with valid data', async () => {
    const request = mockRequest();

    await hardwareController.findAll(request, response, nextFunction);
    expect(hardwareService.findAll).toBeCalled();
    expect(hardwareService.findAll).toBeCalledTimes(1);
    expect(response.json).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith(mockData);
    expect(nextFunction).not.toBeCalled();
  });

  test('findAll() with invalid data', async () => {
    const request = mockRequest();

    hardwareService.findAll.mockRejectedValueOnce('Database error (find hardwares)');

    await hardwareController.findAll(request, response, nextFunction)
    expect(hardwareService.findAll).toBeCalled();
    expect(hardwareService.findAll).toBeCalledTimes(1);
    expect(response.json).not.toBeCalled();
    expect(nextFunction).toBeCalledWith(createError(500, 'Database error (find hardwares)'));
  });


  test('findById() with valid ID', async () => {
    const VALID_HARDWARE_ID = 2;
    const request = mockRequest({
      params: {
        id: VALID_HARDWARE_ID
      }
    });

    await hardwareController.findById(request, response, nextFunction)
    expect(hardwareService.findById).toBeCalledWith(VALID_HARDWARE_ID);
    expect(hardwareService.findById).toBeCalledTimes(1);
    expect(response.json).toBeCalledTimes(1);
    expect(nextFunction).not.toBeCalled();
    expect(response.json).toBeCalledWith(
      mockData.find(p => p.id === VALID_HARDWARE_ID)
    );
  });


  test('findById() with invalid ID', async () => {
    const INVALID_HARDWARE_ID = 4;
    const request = mockRequest({
      params: {
        id: INVALID_HARDWARE_ID
      }
    });

    hardwareService.findById.mockRejectedValueOnce(`Hardware with id ${INVALID_HARDWARE_ID} not found!`);

    await hardwareController.findById(request, response, nextFunction)
    expect(hardwareService.findById).toBeCalledWith(INVALID_HARDWARE_ID);
    expect(hardwareService.findById).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(
      createError(404, `Hardware with id ${INVALID_HARDWARE_ID} not found!`)
    );
  });

});