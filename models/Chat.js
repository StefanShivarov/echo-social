const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/databaseConfig");

class Chat extends Model {}

Chat.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    firstUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    secondUserId: {
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
    modelName: "Chat",
    tableName: "chats",
  }
);

Chat.associate = (models) => {
  Chat.hasMany(models.Message, {
    foreignKey: "chatId",
    as: "messages",
    onDelete: "CASCADE",
  });
};

module.exports = Chat;
