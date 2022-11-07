const User = require('../models/User')
var expect = require('chai').expect;

describe('Testing user model', () => {
  let user;
  beforeEach(() => {
    sampleUser = {
      name: 'John Doe',
      email: 'john@doe.com'
    }
  })

  it('it should throw an error due to empty fields', () => {
    let user = new User()
    user.validate((err) => {
      expect(err.errors.name).to.exist
      expect(err.errors.email).to.exist
    })
  })

  it('it should create the user successfully with correct parameters', (done) => {
    let user = new User({ ...sampleUser })
    user.validate((err) => {
      expect(err).to.not.exist
      done()
    });
  });



});
