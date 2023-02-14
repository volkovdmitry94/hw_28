class Controller {
    constructor(users) {
        this.users = users;
    }
    createUser = (user) => {
        return this.users.add(user);
    }

    addPosts = (id, object) => {
        return this.users.addPosts(id, object);
    }

    removeUser = (id) => {
        return this.users.remove(id);
    }

    getUserById = (id) => {
        return this.users.get(id);
    }

    processUsers(userProcessor) {
        this.users.getAll().forEach(userProcessor);
    }

}