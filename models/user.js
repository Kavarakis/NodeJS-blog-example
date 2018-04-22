var bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();

'use strict';

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'Only letters are allowed in name.'
                },
                len: {
                    args: [4, 100],
                    msg: 'Name needs to be from 4 to 100 characters long.'
                },
            }
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'Only letters are allowed in name.'
                },
                len: {
                    args: [4, 100],
                    msg: 'Surname needs to be from 4 to 100 characters long.'
                },
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'This email is already taken.',
                fields: ['email']
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Email is not in a correct format.'
                },
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {

                len: {
                    args: [4, 200],
                    msg: 'Password needs to be at least 4 characters long.'
                },
            }
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });
    User.associate = (models) => {
        User.hasMany(models.Post, {
            foreignKey: 'userId',
            owner: 'post'
        });
        User.hasMany(models.Comment, {
            foreignKey: 'userId',
            owner: 'comment'
        });
    };

    User.beforeCreate('CreateHashingPassword', (model) => {

        model.password = User.hashPassword(model.password);
    });

    User.beforeUpdate('HashUpdateModel', (model) => {

        model.password = User.hashPassword(model.password);
    });

    User.comparePasswords = function (password, hash, cb) {
        // hash is stored db password of object
        //password is object that needs to be checked

        bcrypt.compare(password, hash, function (err, isMatch) {
            if (err) throw err;
            cb(null, isMatch);
            return isMatch;
        });
    };
    User.hashPassword = (password) => {
        return bcrypt.hashSync(password, salt);
    };
    return User;
};