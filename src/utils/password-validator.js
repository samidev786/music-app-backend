const PasswordValidator = require("password-validator");

const schema = new PasswordValidator();
schema
.is().min(6)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits() 
.has().symbols()                               // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Password@123', 'Password@123']); // Blacklist these values

module.exports = {passwordValidator:schema}