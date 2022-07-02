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

function Email2Username(seed) {
  if (!typeof seed === "Number") throw Error("seed must be a number");
  this.seed = random(seed);
  this.shuffleSeed = 1 / this.seed
  // Domain allowed characters: letters, numbers, dashes, one period
  this.alphabet = ".-0123456789abcdefghijklmnopqrstuvwxyz".split("")
  shuffle(this.alphabet, this.shuffleSeed);

  /**
   * @@@@@@@@@@@@@@@@@@@@@@
   * @param  {String} email
   * @return {String}
   */
  this.toUsername = (email) => {
    if(!validator.validate(email)) throw Error("email is invalid")
    [this.email, this.domain] = email.split("@").map(part => part.split(""));
    shuffle(this.domain, this.shuffleSeed)
    secretDomain = this.domain.map((char) => this.alphabet.indexOf(char))
    // because alphabet is of length 38, each character is mapped to a number of two digits (characters)
    return secretDomain.join()
  }

  /**
   * @@@@@@@@@@@@@@@@@@@@@@
   * @param  {String} username
   * @return {String}
   */
  this.toEmail = (username) => {}

}
/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
module.exports = {
  Email2Username: Email2Username,
};
