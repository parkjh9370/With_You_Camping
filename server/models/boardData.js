const Sequelize = require('sequelize');

module.exports = class BoardData extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        wifi: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        hotWater: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        parking: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        electricity: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        toiletType: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'BoardData',
        tableName: 'boardDatas',
        paranoid: false,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.BoardData.belongsTo(db.Board);
  }
};
