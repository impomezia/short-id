var shortid = require('../index');
var expect  = require('chai').expect;

it('generate id', function() {

  var id = shortid.generate();

  expect(id).to.be.a('string');
  expect(id).to.have.length(7);
  expect(shortid.isValid(id)).to.be.true;
});


it('generate variable size id', function() {

  var tests = [
    1,
    2,
    3,
    -1,
    0xf,
    true,
    'test',
    {},
    [],
    10,
    128
  ];

  var id;

  for (var i = 0; i < tests.length; ++i) {
    id = shortid.generate(tests[i]);

    expect(id).to.be.a('string');
    expect(id).to.have.length.of.at.least(3);
    expect(shortid.isValid(id)).to.be.true;

    if (typeof tests[i] === 'number' && tests[i] >= 3) {
      expect(id).to.have.length(tests[i]);
    }
  }
});


it('support legacy ids', function() {
  expect(shortid.isValid('32UdW3f')).to.be.true;
});


it('validate ids', function() {
  expect(shortid.isValid('B6t1a5B')).to.be.true;
  expect(shortid.isValid('f2V')).to.be.true;
  expect(shortid.isValid('aeM6xB1GoSfRWyNCZtu7eo2M')).to.be.true;
  expect(shortid.isValid('B$t1a5B')).to.be.false;
  expect(shortid.isValid('B6t1a5$')).to.be.false;
});
