const Sequelize = require('sequelize');

module.exports = class Locate extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        latitude: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        longtitude: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        roadAdd: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        lotAdd: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Locate',
        tableName: 'locates',
        paranoid: false,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  
  static associate(db) { 
    db.Located.belongsTo(db.Board);
  }
};
