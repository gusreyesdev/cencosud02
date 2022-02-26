const { Schema, model } = require('mongoose');


const ProfileSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    }, { timestamps: true }
);

module.exports = model('Profile', ProfileSchema);