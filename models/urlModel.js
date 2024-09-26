import Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';

const sequelize = new Sequelize('url_shortener', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const URL = sequelize.define('URL', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  originalUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shortCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  accessCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});


sequelize.sync();

export default URL;
