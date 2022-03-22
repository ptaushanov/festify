export default class User {
    constructor(username, email, password) {
        this.username = username
        this.email = email
        this.password = password
    }
}

export class UserBuilder {
    #username = null
    #email = null
    #password = null

    username(username) {
        this.#username = username;
        return this;
    }

    email(email) {
        this.#email = email;
        return this;
    }

    password(password) {
        this.#password = password;
        return this;
    }

    build() {
        return new User(this.#username, this.#email, this.#password);
    }
}