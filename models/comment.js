'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    body: DataTypes.TEXT,
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'Post Id is not valid.'
        }
      }
    },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        args: true,
        msg: 'User Id is not valid.'
      }
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.NOW
  }
},
 {
    freezeTableName: true
  });
  Comment.beforeBulkUpdate('SettingUpdate', (model) => {
    model.attributes.updatedAt = sequelize.NOW;
  });
  Comment.associate = function (models) {
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post'
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    // associations can be defined here
  };
  return Comment;
};