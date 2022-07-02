import validator from "email-validator";

// Credit
// Source: https://stackoverflow.com/a/19303725/1951298
// Author: Antti Kissaniemi
function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return Math.floor((x - Math.floor(x))*100);
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
  this.shuffleSeed = Math.random()
  // Domain allowed characters: letters, numbers, dashes, one period
  let alphabet = ".-0123456789abcdefghijklmnopqrstuvwxyz"
  this.alphabet = shuffle(alphabet.split(""), shuffleSeed);

  /**
   * @@@@@@@@@@@@@@@@@@@@@@
   * @param  {String} email
   * @return {String}
   */
  (this.toUsername = (email) => {
    if(!validator.validate(email)) throw Error("email is invalid")
    [this.email, this.domain] = email.split("@");
    let secretDomain = shuffle(this.domain.split(""), this.shuffleSeed)
    secretDomain = secretDomain.map((char) => this.alphabet.indexOf(char))
    return secretDomain
  }),
    /**
     * @@@@@@@@@@@@@@@@@@@@@@
     * @param  {String} username
     * @return {String}
     */
    (this.toEmail = (username) => {

    });
}
/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
module.exports = {
  Email2Username: Email2Username,
};
