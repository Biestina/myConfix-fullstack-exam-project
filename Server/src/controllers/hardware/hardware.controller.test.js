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
      "category": "Cpu",
      "name": "AMD Ryzen 5 3600",
      "price": 199.99,
      "description": "AMD Ryzen 5 3600",
      "image": "https://www.amd.com/system/files/2019-11/ryzen-5-3600-3d-render-rgb-1920x1080.png",
      "quantity": 10,
      "rating": 4.5,
      "numReviews": 12,
    }, {
      "id": 2,
      "name": "Corsair 4000D Airflow",
      "category": "Case",
      "price": 99.99,
      "description": "Corsair 4000D Airflow",
      "image": "https://www.corsair.com/medias/sys_master/images/images/hc5/hc5/9111119625982/CC-9011179-WW-4000D-Airflow-01.png",
      "quantity": 10,
      "rating": 4.5,
      "numReviews": 12,
    }];

    validSavedHardware = {
      id: mockData[mockData.length - 1].id + 1,
      name: "MeshCool",
      category: "Case",
      price: 99.99,
      description: "Corsair 4000D Airflow",
      image: "https://www.corsair.com/medias/sys_master/images/images/hc5/hc5/9111119625982/CC-9011179-WW-4000D-Airflow-01.png",
      quantity: 10,
      rating: 4.5,
      numReviews: 12,
    };

    hardwareService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
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
          createError(404, 'Hardware not found')
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
          message: 'Hardware created successfully!',
          createdHardware: validSavedHardware
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
          createError(400, 'Hardware validation failed: name: Path `name` is required.')
        );
      });
  });

  test('updateById() with valid data', () => {

    const VALID_HARDWARE_ID = 2;
    const request = mockRequest({
      params: {
        id: VALID_HARDWARE_ID
      },
      body: validSavedHardware
    });


    return hardwareController.updateById(request, response, nextFunction)
      .then(() => {

        expect(hardwareService.updateById).toBeCalledWith(VALID_HARDWARE_ID, validSavedHardware);
        expect(response.json).toBeCalledWith({
          message: 'Hardware updated successfully!',
          updatedHardware: validSavedHardware
        });
      });
  });

  test('updateById() with invalid data', () => {

    const INVALID_HARDWARE_ID = 4;
    const request = mockRequest({
      params: {
        id: INVALID_HARDWARE_ID
      },
      body: {}
    });


    return hardwareController.updateById(request, response, nextFunction)
      .then(() => {


        expect(hardwareService.updateById).not.toBeCalled();
        expect(nextFunction).toBeCalledWith(
          createError(404, 'Hardware not found')
        );
      });
  });

  test('removeById() with valid ID', () => {

    const VALID_HARDWARE_ID = 2;
    const request = mockRequest({
      params: {
        id: VALID_HARDWARE_ID
      }
    });


    return hardwareController.removeById(request, response, nextFunction)
      .then(() => {


        expect(hardwareService.removeById).toBeCalledWith(VALID_HARDWARE_ID);
        expect(response.json).toBeCalledWith({
          message: 'Hardware deleted successfully'
        });
      });
  });

  test('removeById() with invalid ID', () => {

    const INVALID_HARDWARE_ID = 4;
    const request = mockRequest({
      params: {
        id: INVALID_HARDWARE_ID
      }
    });


    return hardwareController.removeById(request, response, nextFunction)
      .then(() => {


        expect(hardwareService.removeById).toBeCalledWith(INVALID_HARDWARE_ID);
        expect(nextFunction).toBeCalledWith(
          createError(404, 'Hardware not found')
        );
      });
  });

});