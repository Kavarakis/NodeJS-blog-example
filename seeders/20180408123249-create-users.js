'use strict';
var bcrypt = require('bcrypt');
module.exports = {
    up: (queryInterface, Sequelize) => {
        const salt = bcrypt.genSaltSync();
        return queryInterface.bulkInsert('User', [{
                "name": "Jamie",
                "surname": "Perez",
  
                "email": "jamieperez@zaggles.com",
                "password": bcrypt.hashSync('7166', salt),
            },
            {
                "name": "Lakisha",
                "surname": "Heath",
                "email": "lakishaheath@zaggles.com",
                "password": bcrypt.hashSync('8731', salt),
            },
            {
                "name": "Annmarie",
                "surname": "Petty",
                "email": "annmariepetty@zaggles.com",
                "password": bcrypt.hashSync('4900', salt),
            },
            {
                "name": "Russell",
                "surname": "Johns",
                "email": "russelljohns@zaggles.com",
                "password": bcrypt.hashSync('5958', salt),
            },
            {
                "name": "Kirk",
                "surname": "Bradley",
                "email": "kirkbradley@zaggles.com",
                "password": bcrypt.hashSync('7419', salt),
            },
            {
                "name": "Kristina",
                "surname": "Walsh",
                "email": "kristinawalsh@zaggles.com",
                "password": bcrypt.hashSync('2236', salt),
            },
            {
                "name": "Cecelia",
                "surname": "Manning",
                "email": "ceceliamanning@zaggles.com",
                "password": bcrypt.hashSync('2825', salt),
            },
            {
                "name": "Bryan",
                "surname": "Mendez",
                "email": "bryanmendez@zaggles.com",
                "password": bcrypt.hashSync('8067', salt),
            },
            {
                "name": "Abigail",
                "surname": "Keith",
                "email": "abigailkeith@zaggles.com",
                "password": bcrypt.hashSync('7276', salt),
            },
            {
                "name": "Morgan",
                "surname": "Barber",
                "email": "morganbarber@zaggles.com",
                "password": bcrypt.hashSync('7442', salt),
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('User', null, {});
    }
};
