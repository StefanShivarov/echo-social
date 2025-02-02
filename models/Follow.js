const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/databaseConfig");

class Follow extends Model {}

Follow.init(
  {
    followedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Follow",
    tableName: "follows",
    timestamps: false,
  }
);

Follow.associate = (models) => {
  Follow.belongsTo(models.User, { as: "follower", foreignKey: "followerId" });
  Follow.belongsTo(models.User, { as: "following", foreignKey: "followingId" });
};

module.exports = Follow;
