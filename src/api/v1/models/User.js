const users = [];

module.exports = {
    createUser: (userData) => {
        users.push(userData);
        return userData;
    },
    findUserByEmail: (email) => {
        return users.find(user => user.email === email);
    }
};