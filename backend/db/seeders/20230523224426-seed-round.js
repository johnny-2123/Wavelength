'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Rounds';

    await queryInterface.bulkInsert(options, [

      { gameId: 1, user1Agrees: false, user2Agrees: false },
      { gameId: 1, user1Agrees: false, user2Agrees: false },
      { gameId: 1, user1Agrees: false, user2Agrees: false },

      { gameId: 2, user1Agrees: false, user2Agrees: false },
      { gameId: 2, user1Agrees: false, user2Agrees: false },

      { gameId: 3, user1Agrees: false, user2Agrees: false },
      { gameId: 3, user1Agrees: false, user2Agrees: false },
      { gameId: 3, user1Agrees: false, user2Agrees: false },

      { gameId: 4, user1Agrees: false, user2Agrees: false },
      { gameId: 4, user1Agrees: true, user2Agrees: true },
    ]);

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Rounds';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      gameId: { [Op.between]: [1, 8] }
    }, {});
  }
};
