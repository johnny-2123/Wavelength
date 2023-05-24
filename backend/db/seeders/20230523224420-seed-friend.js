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
      { userId: 1, friendId: 6, status: accepted, dateAdded: new Date() },
      { userId: 1, friendId: 7, status: accepted, dateAdded: new Date() },
      { userId: 1, friendId: 8, status: accepted, dateAdded: new Date() },
      { userId: 1, friendId: 9, status: pending },
      { userId: 1, friendId: 10, status: pending },

      { userId: 2, friendId: 1, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 3, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 4, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 5, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 6, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 7, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 8, status: accepted, dateAdded: new Date() },
      { userId: 2, friendId: 9, status: pending },
      { userId: 2, friendId: 10, status: pending },

      { userId: 3, friendId: 1, status: accepted, dateAdded: new Date() },
      { userId: 3, friendId: 2, status: accepted, dateAdded: new Date() },
      { userId: 3, friendId: 4, status: accepted, dateAdded: new Date() },
      { userId: 3, friendId: 5, status: accepted, dateAdded: new Date() },
      { userId: 3, friendId: 6, status: accepted, dateAdded: new Date() },
      { userId: 3, friendId: 7, status: accepted, dateAdded: new Date() },
      { userId: 3, friendId: 8, status: accepted, dateAdded: new Date() },
      { userId: 3, friendId: 9, status: pending },
      { userId: 3, friendId: 10, status: pending },

      { userId: 4, friendId: 1, status: accepted, dateAdded: new Date() },
      { userId: 4, friendId: 2, status: accepted, dateAdded: new Date() },
      { userId: 4, friendId: 3, status: accepted, dateAdded: new Date() },
      { userId: 4, friendId: 5, status: accepted, dateAdded: new Date() },
      { userId: 4, friendId: 6, status: accepted, dateAdded: new Date() },
      { userId: 4, friendId: 7, status: accepted, dateAdded: new Date() },
      { userId: 4, friendId: 8, status: accepted, dateAdded: new Date() },
      { userId: 4, friendId: 9, status: pending },
      { userId: 4, friendId: 10, status: pending },

      { userId: 5, friendId: 1, status: accepted, dateAdded: new Date() },
      { userId: 5, friendId: 2, status: accepted, dateAdded: new Date() },
      { userId: 5, friendId: 3, status: accepted, dateAdded: new Date() },
      { userId: 5, friendId: 4, status: accepted, dateAdded: new Date() },
      { userId: 5, friendId: 6, status: accepted, dateAdded: new Date() },
      { userId: 5, friendId: 7, status: accepted, dateAdded: new Date() },
      { userId: 5, friendId: 8, status: accepted, dateAdded: new Date() },
      { userId: 5, friendId: 9, status: pending },
      { userId: 5, friendId: 10, status: pending },

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
