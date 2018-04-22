let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
chai.use(chaiHttp);
//eslint-disable-next-line no-unused-vars
let should = chai.should();

let token = null;
let userId = null;
let tokenId = null;

describe('Login - POST /login', () => {

    it('Should login successfully with seeder data preset', (done) => {

        let obj = {
            email: 'lakishaheath@zaggles.com',
            password: '8731'
        };

        chai.request(app)
            .post('/login')
            .send(obj)
            .end((err, res) => {

                token = res.body.token;
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.have.property('msg').eql('User is successfully logged in.');
                tokenId = res.body.User.id;
                done();
            });
    });
    it('Wrong password', (done) => {

        let obj = {
            email: 'lakishaheath@zaggles.com',
            password: null
        };

        chai.request(app)
            .post('/login')
            .send(obj)
            .end((err, res) => {

                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.have.property('msg').eql('Bad password.');
                res.body.message.should.have.property('email').eql(true);
                res.body.message.should.have.property('password').eql(false);
                res.body.should.have.property('User').eql(null);
                done();
            });
    });
});

/* 
Test the User - /GET route
*/

describe('Get All - GET /user', () => {


    it('Should GET all the users', (done) => {

        chai.request(app).get('/user').set('Authorization', 'Bearer ' + token)

            .end((err, res) => {

                res.should.have.status(200);
                res.body.user.should.be.a('array');
                res.body.should.have.property('message').eql('Successful retrieval');
                done();
            });
    });
    it('Bad request - Authorization', (done) => {

        chai.request(app).get('/user').set('Authorization', 'Bearer 912odajsklsdj1982137')

            .end((err, res) => {
                res.should.have.status(406);
                res.body.should.have.property('message').eql('Invalid token');
                done();
            });
    });
});
/* 
Test the User - /POST route
*/
describe('Create - POST /user', () => {

    it('Should create new User', (done) => {

        let obj = {
            name: 'Semir',
            surname: 'Salkic',
            email: 'semir.salkic222@gmail.com',
            password: '1234'
        };

        chai.request(app).post('/user').set('Authorization', 'Bearer ' + token)
            .send(obj)
            .end((err, res) => {

                res.should.have.status(201);
                res.body.user.should.be.a('object');
                res.body.should.have.property('message').eql('User created successfully');
                userId = res.body.user.id;
                done();
            });
    });
    it('Unique email validation', (done) => {

        let obj = {
            name: 'Semir',
            surname: 'Salkic',
            email: 'semir.salkic222@gmail.com',
            password: '1234'
        };

        chai.request(app).post('/user').set('Authorization', 'Bearer ' + token)
            .send(obj)
            .end((err, res) => {

                res.should.have.status(400);
                res.body.should.have.property('message').eql('This email is already taken.');
                done();
            });
    });

});
/* 
Test the User - /GET /user:id route
*/
describe('Read - GET /user/:id', () => {

    it('Read existing user', (done) => {

        let obj = {
            name: 'Semir',
            surname: 'Salkic',
            email: 'semir.salkic222@gmail.com',
            password: '1234'
        };

        chai.request(app).get('/user/' + userId).set('Authorization', 'Bearer ' + token)
            .end((err, res) => {

                res.should.have.status(200);
                res.body.user.should.be.a('object');
                res.body.should.have.property('message').eql('User retrieved successfully.');
                res.body.user.should.have.property('name').eql(obj.name);
                res.body.user.should.have.property('surname').eql(obj.surname);
                res.body.user.should.have.property('email').eql(obj.email);

                done();
            });
    });
    it('Read non - existing user', (done) => {

        chai.request(app).get('/user/' + (userId + 2)).set('Authorization', 'Bearer ' + token)
            .end((err, res) => {

                res.should.have.status(404);
                res.body.should.have.property('user').eql(null);
                res.body.should.have.property('message').eql('User not found.');
                done();
            });
    });

});
/* 
Test the User - /PUT /user:id route
Note: Users can update only themselves
*/
describe('Update - PUT /user/:id', () => {

    it('Update unauthorized user', (done) => {

        let obj = {
            name: 'Semir',
            surname: 'Salkic',
            email: 'semir.salkic222@gmail.com',
            password: '1234'
        };
        chai.request(app).put('/user/' + userId).set('Authorization', 'Bearer ' + token)
            .send(obj)
            .end((err, res) => {

                res.should.have.status(401);
                res.body.should.have.property('message').eql('Unauthorized request');
                done();
            });
    });
    it('Update existing - valid user', (done) => {

        let obj = {
            name: 'Semir',
            surname: 'Salkic',
            email: 'semir.salkic@gmail.com',
            password: '1234'
        };

        chai.request(app).put('/user/' + tokenId).set('Authorization', 'Bearer ' + token)
            .send(obj)
            .end((err, res) => {

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('User successfully updated.');
                res.body.User.should.be.a('object');
                res.body.User.should.have.property('name').eql(obj.name);
                res.body.User.should.have.property('surname').eql(obj.surname);
                res.body.User.should.have.property('email').eql(obj.email);

                chai.request(app)
                    .post('/login')
                    .send({
                        email: obj.email,
                        password: obj.password
                    })
                    .end((err, res) => {

                        token = res.body.token;
                        tokenId = res.body.User.id;
                        done();
                    });
            });
    });

});
/* 
Test the User - /DELETE /user:id route
Note: Users can delete only themselves
*/
describe('Delete - DELETE /user/:id', () => {

    it('Delete unauthorized user', (done) => {

        chai.request(app).delete('/user/' + userId).set('Authorization', 'Bearer ' + token)
            .end((err, res) => {

                res.should.have.status(401);
                res.body.should.have.property('message').eql('Unauthorized request');
                done();
            });
    });
    it('Delete existing user', (done) => {

        chai.request(app).delete('/user/' + tokenId).set('Authorization', 'Bearer ' + token)
            .end((err, res) => {

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Deletion successful');
                res.body.should.have.property('affectedRows').eql(1);
                done();
            });
    });

});