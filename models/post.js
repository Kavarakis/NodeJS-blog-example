'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    body: DataTypes.TEXT,
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
      defaultValue: null
    }
  }, {
    freezeTableName: true
  });
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      owner: 'comment'
    });
    // associations can be defined here
  };

  Post.beforeBulkUpdate('SettingUpdate', (model) => {
    model.attributes.updatedAt = sequelize.NOW;
  });
  return Post;
};