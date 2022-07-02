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
    if (typeof length !== "number" || !Number.isInteger(length) || length < 3)
      throw Error(
        "'length' must be an natural number greater or equal to 3. We advice and *even* length >= 4"
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
      "Without length, 'username' would be very long and may not be user friendly.\n" +
        "'baseDomains' is optional in this case. This is fine and advised for mapping in backend"
    );
  }
  if (typeof seed !== "number") throw Error("'seed' must be a number");
  this.length = length;
  this.seed = random(seed);
  this.shuffleSeed = 1 / this.seed;
  // Domain allowed characters: letters, numbers, dashes, one period
  this.alphabet = ".-0123456789abcdefghijklmnopqrstuvwxyz".split("");
  shuffle(this.alphabet, this.shuffleSeed);

  /**
   * "'Email2Username#toUsername' takes an email and returns a username"
   * @param  {String} email
   * @return {String}
   */
  this.toUsername = (email) => {
    if (!validator.validate(email)) {
      throw Error("email is invalid");
    }
    [this.email, this.domain] = email.split("@").map((part) => part.split(""));
    shuffle(this.domain, this.shuffleSeed);
    secretDomain = this.domain.map((char) => {
      const index = this.alphabet.indexOf(char);
      if (index < 10)
        // turn one digit to two (1 -> 01)
        return "0" + index;
      return "" + index;
    });
    // we use section sign as a separator as it is not allowed in an email
    const separator = "§";
    // because alphabet is of length 38, each character is mapped to a number of two digits (characters)
    return (
      this.email.join("") + separator + secretDomain.slice(0, length).join("")
    );
  };

  /**
   * "Email2Username#toEmail" can theoretically recover the email if 'length' has not been provided at first
   * But if 'length' is provided, we cannot recover for instance the email from 'user455645',
   * thus, with the help of 'baseDomains' we can recover the original email.
   * @param  {String} username
   * @return {String}
   */
  this.toEmail = (username_) => {
    const separator = "§";
    let [username, secretDomain] = username_.split(separator);
    // recover original domain
    if (this.length % 2 === 1) length--;
    secretDomain = secretDomain.match(/.{1,2}/g).map(Number); // split by two
    const domain = secretDomain
      .map((code) => {
        return this.alphabet[code];
      })
      .join("");
    return username + "@" + domain;
  };
}
/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
module.exports = {
  Email2Username: Email2Username,
};
