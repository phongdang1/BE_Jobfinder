"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Interview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Association with Post model
      Interview.belongsTo(models.CvPost, {
        foreignKey: "cvPostId",
        as: "cvPostData",
      });
    }
  }

  Interview.init(
    {
      interviewDate: {
        type: DataTypes.DATE,
      },
      interviewLocation: {
        type: DataTypes.TEXT("long"),
      },
      interviewNote: {
        type: DataTypes.TEXT("long"),
      },
      statusCode: {
        type: DataTypes.STRING,
      },
      cvPostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "CvPosts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Interview",
      timestamps: false,
    }
  );

  return Interview;
};
