'use strict';
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        firstName: 'edgar',
        lastName: 'juarez',
        username: 'demoEdgar',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        firstName: 'jolly',
        lastName: 'avila',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        firstName: 'molly',
        lastName: 'avila',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        firstName: 'beyonce',
        lastName: 'knowles',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user5@user.io',
        firstName: 'juan',
        lastName: 'smith',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user6@user.io',
        firstName: 'guadalupe',
        lastName: 'doe',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user7@user.io',
        firstName: 'nick',
        lastName: 'martinez',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user8@user.io',
        firstName: 'sofia',
        lastName: 'tello-garzon',
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user9@user.io',
        firstName: 'daniella',
        lastName: 'sanchez',
        username: 'FakeUser9',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user10@user.io',
        firstName: 'rene',
        lastName: 'patricio',
        username: 'FakeUser10',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user11@user.io',
        firstName: 'melissa',
        lastName: 'segovia',
        username: 'FakeUser11',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user12@user.io',
        firstName: 'emma',
        lastName: 'sanchez',
        username: 'FakeUser12',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user13@user.io',
        firstName: 'micah',
        lastName: 'serano',
        username: 'FakeUser13',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user14@user.io',
        firstName: 'steve',
        lastName: 'lopez',
        username: 'FakeUser14',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user15@user.io',
        firstName: 'kelsey',
        lastName: 'kaushik',
        username: 'FakeUser15',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
