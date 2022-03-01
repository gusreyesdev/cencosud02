const mongoose = require('mongoose');

const connectionDB = async() => {
    
    try {

        await mongoose.connect(process.env.DB_CONNECTION);

        console.log("db online");

    } catch (error) {
        console.log("error connection ", error);
        throw new Error('Error a la hora de conectarse Bd');
    }
}

module.exports = {
    connectionDB
}