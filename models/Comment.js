const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/databaseConfig");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
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
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    createdAt: true,
    updatedAt: true,
  }
);

Comment.associate = (models) => {
  Comment.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });

  Comment.belongsTo(models.Post, {
    foreignKey: "postId",
    as: "post",
  });
};

module.exports = Comment;
