const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        picture: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        rating: {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Board',
        tableName: 'boards',
        paranoid: false,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Board.belongsTo(db.User);
    db.Board.hasMany(db.BoardData, {
      onDelete: 'CASCADE',
    });
    db.Board.hasMany(db.Comment, {
      onDelete: 'CASCADE',
    });
    db.Board.hasMany(db.Located, {
      onDelete: 'CASCADE',
    });
    db.Board.belongsToMany(db.User, {
      through: 'Like',
      onDelete: 'CASCADE',
    }); 
  }
};
