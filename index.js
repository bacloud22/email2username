import validator from "email-validator";

// Credit
// Source: https://stackoverflow.com/a/19303725/1951298
// Author: Antti Kissaniemi
function random(seed) {
  var x = Math.sin(seed++) * 10000;
  return Math.floor((x - Math.floor(x)) * 100);
}
// Credit
// Source: https://stackoverflow.com/a/12646864/1951298
// Author: Laurens Holst
function shuffle(array, seed) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(seed * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function Email2Username(seed, length, baseDomains) {
  if (typeof length !== "undefined") {
    if (typeof length !== "Number" || !Number.isInteger(length) || length < 3)
      throw Error(
        "'length' must be an natural number greater or equal to 3. We advice >= 4"
      );
    else if (
      typeof baseDomains === "undefined" ||
      !Array.isArray(baseDomains) ||
      typeof baseDomains[0] !== "string"
    )
      throw Error(
        "When using 'length', 'baseDomains' must be a defined array of domains of type String"
      );
  } else {
    console.warn(
      "Without length, 'username' would be very long and maybe not user friendly.\n" +
        "'baseDomains' is optional in this case. This is fine and advised for mapping in backend"
    );
  }
  if (typeof seed !== "Number") throw Error("'seed' must be a number");
  this.length = length;
  this.seed = random(seed);
  this.shuffleSeed = 1 / this.seed;
  // Domain allowed characters: letters, numbers, dashes, one period
  this.alphabet = ".-0123456789abcdefghijklmnopqrstuvwxyz".split("");
  shuffle(this.alphabet, this.shuffleSeed);

  /**
   * @@@@@@@@@@@@@@@@@@@@@@
   * @param  {String} email
   * @return {String}
   */
  this.toUsername = (email) => {
    if (!validator.validate(email))
      throw (Error("email is invalid")[(this.email, this.domain)] = email
        .split("@")
        .map((part) => part.split("")));
    shuffle(this.domain, this.shuffleSeed);
    secretDomain = this.domain.map((char) => this.alphabet.indexOf(char));
    // because alphabet is of length 38, each character is mapped to a number of two digits (characters)
    return this.email + secretDomain.slice(0, length).join();
  };

  /**
   * toEmail can theoretically recover the email if length has not been provided at first
   * But if length is provided, we cannot recover for instance the email from 'user455645',
   * thus, with the help of base domains we can recover the original email.
   * @param  {String} username
   * @return {String}
   */
  this.toEmail = (username) => {};
}
/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
module.exports = {
  Email2Username: Email2Username,
};
