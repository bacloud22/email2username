# email2username

**email2username** is a bijective email to username with privacy seed. For easy back and front-end development but also for user privacy.
*this is work in progress*

## API
`Email2Username(seed, length, baseDomains)` 
- `seed` is a chosen number to have a reproducible results (might be a secret)
- `length` must be a natural number greater or equal to 3. We advice an *even* of length >= 4
- When using `length`, `baseDomains` must be a defined array of domains of type String
- Without length, `username` would be very long and may not be user friendly. `baseDomains` is optional in this case. This is fine and advised for mapping in backend
`Email2Username#toUsername` takes an email and returns a username
`Email2Username#toEmail` can theoretically recover the email if `length` has not been provided at first


## Examples
This might be used on front-end as a substitute for real email
```js
const { Email2Username } = require("email2username");
let lib = new Email2Username(3, 3, ['gmail.com', 'hotmail.com'])
lib.toUsername('bacloud14@gmail.com')
// 'bacloud14§231119'
lib.toEmail('bacloud14§231119')
// 'bacloud14@gmail.com'
```

This might be used on back-end as a substitute for real email 
(maybe to communicate with other APIs or a matter of design? or maybe useless :S)
```js
lib = new Email2Username(3)
lib.toUsername('bacloud14@gmail.com')
// 'bacloud14§231119221813252317'
lib.toEmail('bacloud14§231119221813252317')
// 'bacloud14@gmail.com'
```

## License
### author
A.B. 2022  
MIT
