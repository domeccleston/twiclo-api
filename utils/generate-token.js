const jwt = require('jsonwebtoken');

module.exports = id => jwt.sign(
    id,
    'labyrinths',
    { expiresIn: '1d' }
);

