const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/databaseConfig");

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "posts",
        key: "id",
      },
    },
    commentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "comments",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Like",
    tableName: "likes",
    createdAt: true,
    updatedAt: true,
  }
);

Like.associate = (models) => {
  Like.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });

  Like.belongsTo(models.Post, {
    foreignKey: "postId",
    as: "post",
  });

  Like.belongsTo(models.Comment, {
    foreignKey: "commentId",
    as: "comment",
  });
};

module.exports = Like;
