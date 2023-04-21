const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const hardwareController = require('./hardware.controller');
const hardwareService = require('./hardware.service');
jest.mock('./hardware.service.js');


describe('HardwareController tests', () => {
  let mockData;
  let nextFunction;
  let response;

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
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findAll() with valid data', () => {
    const request = mockRequest();

    return hardwareController.findAll(request, response, nextFunction)
      .then(() => {
        expect(hardwareService.findAll).toBeCalled();
        expect(response.json).toBeCalledWith(mockData);
      });
  });

  test('findAll() with invalid data', () => {
    const request = mockRequest();

    hardwareService.findAll.mockImplementationOnce(() => Promise.reject('Database error (find hardwares)'));

    return hardwareController.findAll(request, response, nextFunction)
      .then(() => {
        expect(nextFunction).toBeCalledWith(createError(500, 'Database error (find hardwares)'));
      });
  });


  test('findById() with valid ID', () => {
    const VALID_HARDWARE_ID = 2;
    const request = mockRequest({
      params: {
        id: VALID_HARDWARE_ID
      }
    });

    return hardwareController.findById(request, response, nextFunction)
      .then(() => {
        expect(hardwareService.findById).toBeCalledWith(VALID_HARDWARE_ID);
        expect(response.json).toBeCalledWith(
          mockData.find(p => p.id === VALID_HARDWARE_ID)
        );
      });
  });


  test('findById() with invalid ID', () => {
    const INVALID_HARDWARE_ID = 4;
    const request = mockRequest({
      params: {
        id: INVALID_HARDWARE_ID
      }
    });

    return hardwareController.findById(request, response, nextFunction)
      .then(() => {
        expect(hardwareService.findById).toBeCalledWith(INVALID_HARDWARE_ID);
        expect(nextFunction).toBeCalledWith(
          createError(404, `Hardware with id ${INVALID_HARDWARE_ID} not found!`)
        );
      });
  });

  test('create() with valid data', () => {
    const request = mockRequest({
      body: validSavedHardware
    });

    return hardwareController.create(request, response, nextFunction)
      .then(() => {

        expect(hardwareService.create).toBeCalledWith(validSavedHardware);
        expect(response.status).toBeCalledWith(201);
        expect(response.json).toBeCalledWith({
          // createdHardware: 
          validSavedHardware
        });
      });
  });

  test('create() with invalid data', () => {
    const request = mockRequest({
      body: {}
    });

    return hardwareController.create(request, response, nextFunction)
      .then(() => {
        expect(hardwareService.create).not.toBeCalled();
        expect(nextFunction).toBeCalledWith(
          createError(500, 'Hardware could not be saved')
        );
      });
  });

  test('update() with valid data', () => {
    const VALID_HARDWARE_ID = 2;
    const request = mockRequest({
      params: {
        id: VALID_HARDWARE_ID
      },
      body: validSavedHardware
    });

    return hardwareController.update(request, response, nextFunction)
      .then(() => {

        expect(hardwareService.update).toBeCalledWith(VALID_HARDWARE_ID, validSavedHardware);
        expect(response.json).toBeCalledWith({
          // updatedHardware: 
          validSavedHardware
        });
      });
  });

  test('update() with invalid data', () => {
    const INVALID_HARDWARE_ID = 4;
    const request = mockRequest({
      params: {
        id: INVALID_HARDWARE_ID
      },
      body: {}
    });

    return hardwareController.update(request, response, nextFunction)
      .then(() => {
        expect(hardwareService.update).not.toBeCalled();
        expect(nextFunction).toBeCalledWith(
          createError.InternalServerError('Could not update')
        );
      });
  });

  test('delete() with valid ID', () => {
    const VALID_HARDWARE_ID = 2;
    const request = mockRequest({
      params: {
        id: VALID_HARDWARE_ID
      }
    });

    return hardwareController.delete(request, response, nextFunction)
      .then(() => {
        expect(hardwareService.delete).toBeCalledWith(VALID_HARDWARE_ID);
        // expect(response.json).toBeCalledWith(
        //   `Deleted hardware with id ${VALID_HARDWARE_ID}`
        // );
        // expect(response.status).toBeCalledWith(204);
        expect(response.end).toBeCalledWith(`Deleted hardware with id ${VALID_HARDWARE_ID}`);
        expect(response.json).not.toBeCalled();
      });
  });

  test('delete() with invalid ID', () => {
    const INVALID_HARDWARE_ID = 4;
    const request = mockRequest({
      params: {
        id: INVALID_HARDWARE_ID
      }
    });

    return hardwareController.delete(request, response, nextFunction)
      .then(() => {
        expect(hardwareService.delete).toBeCalledWith(INVALID_HARDWARE_ID);
        expect(nextFunction).toBeCalledWith(
          createError.InternalServerError('Database error (delete hardware)')
        );
      });
  });

});