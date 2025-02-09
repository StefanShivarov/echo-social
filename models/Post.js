const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/databaseConfig");

class Post extends Model {}

Post.init(
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
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    createdAt: true,
    updatedAt: true,
  }
);

Post.associate = (models) => {
  Post.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });

  Post.hasMany(models.Comment, {
    foreignKey: "postId",
    as: "comments",
    onDelete: "CASCADE",
  });

  Post.hasMany(models.Like, {
    foreignKey: "postId",
    as: "likes",
    onDelete: "CASCADE",
  });
};

module.exports = Post;
