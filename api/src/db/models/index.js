const Sequelize = require('sequelize');
const { sequelize } = require('../index.js');

const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    github: {
      type: Sequelize.STRING(400),
      allowNull: true
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    promo: {
      type: Sequelize.STRING(150),
      allowNull: true
    },
    password: {
      type: Sequelize.STRING(300),
      allowNull: false
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    is_validate: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    underscored: true
  }
  //par default "tableName" serait "roles" (au pluriel),
  //"timestamps" crée 2 champs automatique pour les dates de création
  //et de modification (très pratique si nécessaire) et
  //"underscored" permet de créer automatiquement des champs de
  //"relation" entre les tables de type "role_id" plutôt que "UserId".
);

const Promo = sequelize.define('promo', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: 'promos',
    timestamps: true,
    underscored: true
  }
);

const RefreshToken = sequelize.define('RefreshToken', {
  id: {
      //field: 'id',
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  token: {
      //field: 'token',
      type: Sequelize.STRING,
      allowNull: false
  },
  expiresAt: {
      field: 'expires_at',
      type: Sequelize.DATE,
      allowNull: false
    },
  userId: {
      field: 'user_id',
      type: Sequelize.INTEGER,
      allowNull: true,
      /*
      references: {
        model: 'user',
        key: 'id'
      }*/
    }
  },
  {
    tableName: 'refresh_token',
    underscored: true
  }
);

try {
  sequelize.sync();
}
catch (e) {
  console.log(e);
}

module.exports = {
  User,
  Promo,
  RefreshToken
}
