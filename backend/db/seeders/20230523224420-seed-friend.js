'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Friends';

    const accepted = 'accepted';
    const pending = 'pending';

    await queryInterface.bulkInsert(options, [
      { userId: 1, friendId: 2, status: accepted, dateAdded: new Date() },
      { userId: 1, friendId: 3, status: accepted, dateAdded: new Date() },
      { userId: 1, friendId: 4, status: accepted, dateAdded: new Date() },
      { userId: 1, friendId: 5, status: accepted, dateAdded: new Date() },
      // { userId: 1, friendId: 16, status: accepted, dateAdded: new Date() },

      { userId: 2, friendId: 3, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 4, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 5, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 6, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 7, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 8, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 9, status: pending },
      { userId: 2, friendId: 10, status: pending },


      { userId: 6, friendId: 1, status: pending },
      { userId: 7, friendId: 1, status: pending },
      { userId: 8, friendId: 1, status: pending },
      { userId: 9, friendId: 1, status: pending },
      { userId: 10, friendId: 1, status: pending },
      { userId: 11, friendId: 1, status: pending },
      { userId: 12, friendId: 1, status: pending },
    ], options);


  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Friends';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.between]: [1, 15] }
    }, {});
  }
};
