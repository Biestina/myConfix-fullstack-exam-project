const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Hardware = require('./models/hardware.model');
const Config = require('./models/config.model');
const User = require('./models/user.model');

describe('REST API integration tests', () => {

  let ACCESSTOKEN1;
  let ACCESSTOKEN2;
  let REFRESHTOKEN;
  let hardwareDB;
  let configDB;
  let userDB;

  const insertHardwares = [
    { "name": "NZXT", "category": "case" },
    { "name": "Intel", "category": "cpu" },
    { "name": "AMD", "category": "cpu" },
    { "name": "Gigabyte", "category": "motherboard" },
    { "name": "MSI", "category": "motherboard" },
    { "name": "Corsair", "category": "ram" },
    { "name": "G.Skill", "category": "ram" },
    { "name": "Samsung", "category": "storage" },
    { "name": "WD", "category": "storage" },
    { "name": "EVGA", "category": "psu" },
    { "name": "Corsair", "category": "psu" },
    { "name": "Asus", "category": "monitor" },
    { "name": "Acer", "category": "monitor" },
    { "name": "NVIDIA", "category": "gpu" },
    { "name": "AMD", "category": "gpu" }
  ];

  beforeEach(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/SuperTestDB');
    hardwareDB = await Hardware.insertMany(insertHardwares);
    const insertConfigs = [
      {
        "cpu": insertHardwares[2].name,
        "motherboard": insertHardwares[3].name,
        "ram": insertHardwares[6].name,
        "storage": insertHardwares[8].name,
        "psu": insertHardwares[10].name,
        "monitor": insertHardwares[11].name,
        "gpu": insertHardwares[13].name
      },
      {
        "cpu": insertHardwares[1].name,
        "motherboard": insertHardwares[4].name,
        "ram": insertHardwares[5].name,
        "storage": insertHardwares[7].name,
        "psu": insertHardwares[9].name,
        "monitor": insertHardwares[12].name,
        "gpu": insertHardwares[14].name
      }
    ];

    await Config.deleteMany({});
    configDB = await Config.insertMany(insertConfigs);
    const insertUsers = [
      { email: "user1@test.com", password: "test", role: "USER", configs: [] },
      { email: "user2@test.com", password: "test", role: "USER", configs: [] }
    ];

    userDB = await User.insertMany(insertUsers);
    await User.updateMany({ _id: userDB[0]._id }, { $push: { configs: configDB[0]._id } }).exec();

    await supertest(app).post('/api/login').send({ "email": "user1@test.com", "password": "test" })
      .then(res => {
        ACCESSTOKEN1 = res.body.accessToken;
      });

    await supertest(app).post('/api/login').send({ "email": "user2@test.com", "password": "test" })
      .then(res => {
        ACCESSTOKEN2 = res.body.accessToken;
      });
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  })

  test('GET /hardwares endpoint', async () => {
    const response = await supertest(app).get('/api/hardwares');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(15);
    expect(response.body[0].name).toBe('NZXT');
    expect(response.body[response.body.length - 1].category).toBe('gpu');
  });

  test('GET /hardwares/:id endpoint', async () => {
    const firstHardwareId = hardwareDB[0]._id;
    const response = await supertest(app).get(`/api/hardwares/${firstHardwareId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('NZXT');
    expect(response.body.category).toBe('case');
  });

  test('GET /configs endpoint as user1 with 2 configs', async () => {
    const firstUserId = userDB[0]._id.toString();
    const response = await supertest(app)
      .get(`/api/configs/${firstUserId}/myconfigs`)
      .set('Authorization', `Bearer ${ACCESSTOKEN1}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(userDB.find(user => user._id == firstUserId).configs.length);
  });

  test('POST /configs endpoint as user1 with 2 configs', async () => {
    const firstUserId = userDB[0]._id.toString();
    const postBody = { "cpu": hardwareDB[1].name, "motherboard": hardwareDB[3].name, "ram": hardwareDB[5].name, "storage": hardwareDB[7].name, "psu": hardwareDB[9].name, "monitor": hardwareDB[11].name, "gpu": hardwareDB[13].name };

    const response = await supertest(app)
      .post(`/api/configs/${firstUserId}/myconfigs`)
      .set('Authorization', `Bearer ${ACCESSTOKEN1}`)
      .send(postBody);
    expect(response.statusCode).toBe(201);
  });

  test('GET /configs/:id endpoint as user1 with 2 configs', async () => {
    const firstUserId = userDB[0]._id;
    const firstConfigId = configDB[0]._id;
    const response = await supertest(app)
      .get(`/api/configs/${firstUserId}/myconfigs/${firstConfigId}`)
      .set('Authorization', `Bearer ${ACCESSTOKEN1}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.cpu).toBe('AMD');
  });

  test('GET /users endpoint', async () => {
    const response = await supertest(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].email).toBe('user1@test.com');
    expect(response.body[response.body.length - 1].email).toBe('user2@test.com');
    expect(response.body[0].configs.length).toBe(1);
  });

  test('POST /users endpoint', async () => {
    const postBody = { "email": "test@super.com", "password": "test" };
    const response = await supertest(app).post('/api/users').send(postBody);
    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe('test@super.com');

    const response2 = await supertest(app).get('/api/users');
    expect(response2.statusCode).toBe(200);
    expect(response2.body.length).toBe(3);
    expect(response2.body[response2.body.length - 1].email).toBe('test@super.com');
  });

  test('GET /users/:id endpoint', async () => {
    const firstUserId = userDB[0]._id;
    const response = await supertest(app).get(`/api/users/${firstUserId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe('user1@test.com');

    const secondUserId = userDB[1]._id;
    const response2 = await supertest(app).get(`/api/users/${secondUserId}`);
    expect(response2.statusCode).toBe(200);
    expect(response2.body.email).toBe('user2@test.com');
  });

  test('POST /login endpoint', async () => {
    const postBody = { "email": "user1@test.com", "password": "test" };
    const response = await supertest(app).post('/api/login').send(postBody);
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
  });

  test('POST /logout endpoint', async () => {
    const postBody = { "email": "user1@test.com", "password": "test" };
    const response = await supertest(app).post('/api/login').send(postBody);
    const accessToken = response.body.accessToken;
    const refreshToken = response.body.refreshToken;
    const response2 = await supertest(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ refreshToken: refreshToken })
    expect(response2.statusCode).toBe(200);
  });

  test('POST /refresh endpoint', async () => {
    const postBody = {
      email: "user1@test.com",
      password: "test"
    }
    const refreshToken = await supertest(app).post(`/api/login`).send(postBody).then((response) => {
      return response.body.refreshToken;
    });
    const response = await supertest(app)
      .post('/api/refresh')
      .send({ refreshToken: refreshToken })
      .set('Authorization', `Bearer ${ACCESSTOKEN1}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });

  test('GET /me endpoint', async () => {
    const response = await supertest(app)
      .get('/api/me')
      .set('Authorization', `Bearer ${ACCESSTOKEN1}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('role');
    expect(response.body.user.email).toBe('user1@test.com');
  });

});