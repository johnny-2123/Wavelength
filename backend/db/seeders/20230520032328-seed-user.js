"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
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
    options.tableName = "Users";
    await queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@user.io",
          firstName: "edgar",
          lastName: "juarez",
          username: "demoEdgar",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/wavelength-37ac1.appspot.com/o/images%2Fd99c6ea4-7a66-4e68-8af1-29dc38dd24cd.jpg?alt=media&token=db3d0f89-3e01-4fe0-b789-cdb8e25823bb",
          guid: "d99c6ea4-7a66-4e68-8af1-29dc38dd24cd",
        },
        {
          email: "user2@user.io",
          firstName: "jolly",
          lastName: "avila",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password2"),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/wavelength-37ac1.appspot.com/o/images%2F5363031a-5602-44c7-ace6-97b197c82200d.jpg?alt=media&token=d786b506-f297-47de-ba87-9e29cdcb6d07",
          guid: "e055bae2-273d-11ee-be56-0242ac120002",
        },
        {
          email: "user3@user.io",
          firstName: "molly",
          lastName: "avila",
          username: "FakeUser3",
          hashedPassword: bcrypt.hashSync("password3"),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/wavelength-37ac1.appspot.com/o/images%2Ff199dce9-622a-4963-8821-abafa198b70a.jpg?alt=media&token=20d5b4ca-802e-4e29-85ce-5e35283d6905",
          guid: "f199dce9-622a-4963-8821-abafa198b70a",
        },
        {
          email: "user4@user.io",
          firstName: "beyonce",
          lastName: "knowles",
          username: "FakeUser4",
          hashedPassword: bcrypt.hashSync("password3"),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/wavelength-37ac1.appspot.com/o/images%2Fd03c0ac7-6c36-4df9-84fd-26007352e0f0.jpg?alt=media&token=386470d2-e86c-4968-89ff-0a88214e1215",
          guid: "d03c0ac7-6c36-4df9-84fd-26007352e0f0",
        },
        {
          email: "user5@user.io",
          firstName: "chito",
          lastName: "juarez",
          username: "FakeUser5",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://res.cloudinary.com/dkul3ouvi/image/upload/v1688073928/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e_iwci96.jpg",
          guid: "6cec296e-273e-11ee-be56-0242ac120002",
        },
        {
          email: "user6@user.io",
          firstName: "guadalupe",
          lastName: "doe",
          username: "FakeUser6",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/wavelength-37ac1.appspot.com/o/images%2F9e018cbc-47fa-4941-8509-4bd3806871d4.jpg?alt=media&token=8bcea61f-cf10-4df6-9f90-95c4a84b039b",
          guid: "9e018cbc-47fa-4941-8509-4bd3806871d4",
        },
        {
          email: "user7@user.io",
          firstName: "nick",
          lastName: "martinez",
          username: "FakeUser7",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/wavelength-37ac1.appspot.com/o/images%2F308a5451-752b-4a61-b090-7cbc742540cb.jpeg?alt=media&token=03f33035-7e06-4095-aa21-eb6bf22345da",
          guid: "308a5451-752b-4a61-b090-7cbc742540cb",
        },
        {
          email: "user8@user.io",
          firstName: "sofia",
          lastName: "tello-garzon",
          username: "FakeUser8",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/wavelength-37ac1.appspot.com/o/images%2F0ead881f-bb86-49c8-8034-28a4903ce5b3.jpeg?alt=media&token=fd76edef-22ae-4450-ad7c-abb675b04025",
          guid: "0ead881f-bb86-49c8-8034-28a4903ce5b3",
        },
        {
          email: "user9@user.io",
          firstName: "daniella",
          lastName: "sanchez",
          username: "FakeUser9",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/wavelength-37ac1.appspot.com/o/images%2Fa55736d1-b2df-4b55-aae4-d55fab279b48.png?alt=media&token=1ccb5c64-2567-46c1-8f44-84a9f135a522",
          guid: "a55736d1-b2df-4b55-aae4-d55fab279b48",
        },
        {
          email: "user10@user.io",
          firstName: "rene",
          lastName: "patricio",
          username: "FakeUser10",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/wavelength-37ac1.appspot.com/o/images%2F4ff34e89-63d6-413e-81ea-56370dad2089.jpeg?alt=media&token=962c63a5-e5f6-43f4-bf04-f3bdcb40caf7",
          guid: "4ff34e89-63d6-413e-81ea-56370dad2089",
        },
        {
          email: "user11@user.io",
          firstName: "melissa",
          lastName: "segovia",
          username: "FakeUser11",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/wavelength-37ac1.appspot.com/o/images%2Feb1e5a9f-b610-4ec3-9a46-69033ffa667f.jpeg?alt=media&token=7ffc706d-69e2-4a9a-b783-4069184cd31e",
          guid: "eb1e5a9f-b610-4ec3-9a46-69033ffa667f",
        },
        {
          email: "user12@user.io",
          firstName: "emma",
          lastName: "sanchez",
          username: "FakeUser12",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://res.cloudinary.com/dkul3ouvi/image/upload/v1688073928/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e_iwci96.jpg",
          guid: "a2add825-218f-4c62-9c02-9ded8edc013d",
        },
        {
          email: "user13@user.io",
          firstName: "micah",
          lastName: "serano",
          username: "FakeUser13",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://res.cloudinary.com/dkul3ouvi/image/upload/v1688073928/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e_iwci96.jpg",
          guid: "13667f94-ac36-4191-b19e-f31f63e97c75",
        },
        {
          email: "user14@user.io",
          firstName: "steve",
          lastName: "lopez",
          username: "FakeUser14",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://res.cloudinary.com/dkul3ouvi/image/upload/v1688073928/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e_iwci96.jpg",
          guid: "cabc3791-0478-4974-96c7-e513bd894196",
        },
        {
          email: "user15@user.io",
          firstName: "kelsey",
          lastName: "kaushik",
          username: "FakeUser15",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl:
            "https://res.cloudinary.com/dkul3ouvi/image/upload/v1688073928/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e_iwci96.jpg",
          guid: "3109a37a-fedd-4619-acd1-afbc219cfe5b",
        },
        // , {
        //   email: 'chatGPT.io',
        //   firstName: 'chat',
        //   lastName: 'GPT',
        //   username: 'chatGPT',
        //   hashedPassword: bcrypt.hashSync('password')
        // }
      ],
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "demoEdgar",
            "FakeUser1",
            "FakeUser2",
            "FakeUser3",
            "FakeUser4",
            "FakeUser5",
            "FakeUser6",
            "FakeUser7",
            "FakeUser8",
            "FakeUser9",
            "FakeUser10",
            "FakeUser11",
            "FakeUser12",
            "FakeUser13",
            "FakeUser14",
            "FakeUser15",
          ],
        },
      },
      {}
    );
  },
};
