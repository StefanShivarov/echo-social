const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/databaseConfig");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
    },
    facebookId: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

User.associate = (models) => {
  User.belongsToMany(models.User, {
    through: models.Follow,
    as: "followers",
    foreignKey: "followingId",
    otherKey: "followerId",
  });

  User.belongsToMany(models.User, {
    through: models.Follow,
    as: "followedUsers",
    foreignKey: "followerId",
    otherKey: "followingId",
  });

  User.hasMany(models.Post, {
    foreignKey: "userId",
    as: "posts",
  });

  User.hasMany(models.Comment, {
    foreignKey: "userId",
    as: "comments",
  });
};

module.exports = User;
