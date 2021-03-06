const { I } = inject()

class LandingPage {}

module.exports = {

  // insert your locators and methods here
  // setting locators
  fields: {
    email: '#user_basic_email',
    password: '#user_basic_password'
  },
  submitButton: { css: '#new_user_basic input[type=submit]' },

  openPortal () {
    I.amOnPage('/')
  },

  checkAboutPage () {
    I.click('About');
    // I.amOnPage('https://blog.voluntarily.nz/')
    I.see('With Aotearoa NZ facing a future filled with uncertainty, helping each other is needed now more than ever.')
  },

  checkGetInvolvedPage () {
    I.amOnPage('https://blog.voluntarily.nz/get-involved')
    I.see('Nau mai haere mai | Welcome!')
  }

}

Object.setPrototypeOf(module.exports, LandingPage.prototype)
