const Sequelize = require('sequelize');

module.exports = class BoardData extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        area: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        wifi: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        parking: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        electricity: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        toiletType: {
          type: Sequelize.STRING,
          allowNull: false,
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
