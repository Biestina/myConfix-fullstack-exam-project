const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const configController = require('./config.controller');
const configService = require('./config.service');
jest.mock('./config.service.js');

describe('ConfigController tests', () => {

    let mockData;
    let nextFunction;
    let response;

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
        }];

        configService.__setMockData(mockData);
        nextFunction = jest.fn();
        response = mockResponse();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('findById() with valid ID', () => {
        const VALID_CONFIG_ID = 2;

        const request = mockRequest({
            params: {
                id: VALID_CONFIG_ID
            }
        });

        return configController.findById(request, response, nextFunction)
            .then(() => {
                expect(configService.findById).toBeCalledWith(VALID_PERSON_ID);
                expect(configService.findById).toBeCalledTimes(1)
                expect(response.json).toBeCalledWith(mockData.find(p => p.id === VALID_CONFIG_ID))
            })

    })

    test('findById() with invalid ID', async () => {
        const INVALID_CONFIG_ID = 4;

        const request = mockRequest({
            params: {
                id: INVALID_CONFIG_ID
            }
        });

        await configController.findById(request, response, nextFunction);
        expect(configService.findById).toBeCalledWith(INVALID_CONFIG_ID);
        expect(configService.findById).toBeCalledTimes(1);
        expect(response.json).not.toBeCalled();
        expect(nextFunction).toBeCalledWith(new createError.NotFound(`Config with id ${INVALID_CONFIG_ID} was not found!`));

    })

    test("create() with valid request body", async () => {

        const validSavedConfig = {
            id: mockData[mockData.length-1].id + 1,
            case: "MeshCool",
            cpu: "Ryzen 5",
            gpu: "GTX 4070",
            motherboard: "X570",
            monitor: "Asus24",
            psu: "Gold90+",
            ram: "GSkill 16",
            storage: "WD Blue",
        }    
 
        const request = mockRequest({
            body: {
                'case': validSavedConfig.case,
                'cpu': validSavedConfig.cpu,
                'gpu': validSavedConfig.gpu,
                'monitor': validSavedConfig.monitor,
                'psu': validSavedConfig.psu,
                'ram': validSavedConfig.ram,
                'storage': validSavedConfig.storage
            }
        });

        const saveObj = // request.body?
        {
            case: validSavedConfig.case
        };

        await configController.create(request, response, nextFunction)

        expect(configService.create).toBeCalledWith(saveObj);
        expect(nextFunction).not.toBeCalled();
        expect(response.json).toBeCalledWith(validSavedConfig);
        expect(response.json).toBeCalledTimes(1);
        expect(response.status).toBeCalledWith(201)
    })

});
