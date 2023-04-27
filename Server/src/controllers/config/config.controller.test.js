const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const configController = require('./config.controller');
const configService = require('./config.service');
jest.mock('./config.service.js');

describe('ConfigController tests', () => {

  let mockData;
  let mockDataUser;
  let response;
  let nextFunction;

  beforeEach(() => {
    mockData = [{
      "id": 1,
      "case": "Lian Li Lancool II Mesh",
      "cpu": "AMD Ryzen 5 3600",
      "gpu": "NVIDIA Founders Edition",
      "motherboard": "Asus TUF GAMING X570-PLUS (WI-FI)",
      "monitor": "Asus VG248QG",
      "psu": "EVGA BQ",
      "ram": "G.Skill Ripjaws V 16 GB",
      "storage": "Intel SSDPEDMD020T401",
      "related_user": "1"
    }, {
      "id": 2,
      "case": "Corsair 4000D Airflow",
      "cpu": "AMD Ryzen 5 3600",
      "gpu": "Asus Phoenix",
      "motherboard": "",
      "monitor": "",
      "psu": "Corsair HX Platinum",
      "ram": "Corsair Vengeance LPX 16 GB",
      "storage": "Samsung 980 Pro",
      "related_user": "1"
    }];

    mockDataUser = [
      {
        "id": "1",
        "username": "user1",
        "password": "password1",
        "role": "USER",
        "configs": [{
          "id": 1,
          "case": "case1",
          "cpu": "cpu1",
          "gpu": "gpu1",
          "related_user": 1
        },
        {
          "id": 2,
          "case": "case2",
          "cpu": "cpu2",
          "gpu": "gpu2",
          "related_user": 1
        }]
      },
      {
        "id": "2",
        "username": "user2",
        "password": "password2",
        "role": "USER",
        "configs": [{
          "id": 3,
          "case": "case3",
          "cpu": "cpu3",
          "gpu": "gpu3",
          "related_user": 2
        },
        {
          "id": 4,
          "case": "case4",
          "cpu": "cpu4",
          "gpu": "gpu4",
          "related_user": 2
        }]
      }
    ];

    validSavedConfig = {
      id: mockData[mockData.length - 1].id + 1,
      case: "MeshCool",
      cpu: "Ryzen 5",
      gpu: "GTX 4070",
      motherboard: "X570",
      monitor: "Asus24",
      psu: "Gold90+",
      ram: "GSkill 16",
      storage: "WD Blue",
      related_user: "1"
    };

    configService.__setMockData(mockData);
    configService.__setMockDataUser(mockDataUser);
    response = mockResponse();
    nextFunction = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findAll() with invalid data', async () => {
    const request = mockRequest();

    await configController.findAll(request, response, nextFunction);
    expect(configService.findAll).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(createError(500, 'Database error (cannot find configs)'));
  });

  test('findById() with valid ID', async () => {
    const VALID_CONFIG_ID = 2;
    const request = mockRequest({
      params: {
        id: VALID_CONFIG_ID
      }
    });

    await configController.findById(request, response, nextFunction);
    expect(configService.findById).toBeCalledTimes(1);
  });

  test("create() with valid request body", async () => {
    const request = mockRequest({
      body: {
        'case': validSavedConfig.case,
        'cpu': validSavedConfig.cpu,
        'gpu': validSavedConfig.gpu,
        'motherboard': validSavedConfig.motherboard,
        'monitor': validSavedConfig.monitor,
        'psu': validSavedConfig.psu,
        'ram': validSavedConfig.ram,
        'storage': validSavedConfig.storage
      },
      params: {
        id: "1"
      }
    });

    await configController.create(request, response, nextFunction);
    expect(configService.create).toBeCalled();
    expect(configService.create).toBeCalledTimes(1);
  });

  test("update() with invalid id", async () => {
    const request = mockRequest({
      params: {
        id: 4
      },
      body: {
        "case": "new case"
      }
    });

    await configController.update(request, response, nextFunction);
    expect(configService.update).toBeCalled();
    expect(response.json).not.toBeCalled();
    expect(nextFunction).toBeCalledWith(new createError.InternalServerError("Could not update"));
  });

  test("delete() with invalid ID", async () => {
    const INVALID_CONFIG_ID = 4;
    const request = mockRequest({
      params: {
        id: INVALID_CONFIG_ID
      }
    });

    await configController.delete(request, response, nextFunction);
    expect(configService.delete).toBeCalled();
    expect(response.json).not.toBeCalled();
    expect(nextFunction).toBeCalledWith(new createError.InternalServerError("Database error (cannot delete config)"));
  });

});
