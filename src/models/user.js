"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //package
      User.belongsToMany(models.Package, {
        through: "UserPackage",
        foreignKey: "userId",
        otherKey: "packageId",
        as: "userPackages",
      });
      //company
      User.hasOne(models.Company, {
        foreignKey: "userId",
        as: "companyUserData",
      });
      //Cv_post - Post
      User.belongsToMany(models.Post, { through: models.CvPost  });
      //UserDetail
      User.hasOne(models.UserDetail, {
        foreignKey: "userId",
        as: "UserDetailData",
      });
      //UserSkill - Skill
      User.belongsToMany(models.Skill, { through: models.UserSkill });
      //Note
      User.hasMany(models.Note, { foreignKey: "userId", as: "userNoteData" });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      dob: DataTypes.DATE,
      point: DataTypes.INTEGER,
      role: DataTypes.STRING,
      status: DataTypes.STRING,
      isUpdate: DataTypes.TINYINT,
      isVip: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
