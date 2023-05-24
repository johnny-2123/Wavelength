'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Words';

    await queryInterface.bulkInsert(options, [

      { roundId: 1, userId: 1, wordText: 'babe' },
      { roundId: 1, userId: 2, wordText: 'lungs' },
      { roundId: 2, userId: 1, wordText: 'choke me' },
      { roundId: 2, userId: 2, wordText: 'choke me' },
    ]);



  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Words';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      gameId: { [Op.between]: [1, 8] }
    }, {});
  }
};
