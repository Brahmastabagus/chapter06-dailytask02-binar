'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Brahmasta Bagus Aryandra',
          nim: '20104021',
          kelas: 'SE04A',
          generation: '2020',
          createdAt: '2023-05-21T14:00:07.369Z',
          updatedAt: '2023-05-21T10:08:51.886Z'
        }
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('students', null, {})
  }
}
