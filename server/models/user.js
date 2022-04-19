const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        nickname: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        job: {
          type: Sequelize.STRING(50),
          allowNull: true,
          defaultValue: '개발자',
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: 'local',
        },
        // 카카오 로그인시 아이디
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        // mb4 -> 이모티콘도 사용 가능
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
 
  static associate(db) {
    db.User.hasMany(db.Board, {
      onDelete: 'CASCADE',
    });
    db.User.hasMany(db.Comment, {
      onDelete: 'CASCADE',
    });
    db.User.belongsToMany(db.Board, {
      through: 'like',
      onDelete: 'CASCADE',
    });
  }
};
