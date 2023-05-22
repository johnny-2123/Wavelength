'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      round_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Games', key: 'id', onDelete: 'CASCADE' }
      },
      word1_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Words', key: 'id', onDelete: 'CASCADE' }
      },
      word2_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Words', key: 'id', onDelete: 'CASCADE' }
      },
      user1_agrees: {
        type: Sequelize.BOOLEAN
      },
      user2_agrees: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rounds');
  }
};
