const { Schema, model } = require('mongoose');


const StudentSchema = Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true

        },
        note: {
            type: String
        }
    }
);


const CourseSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        students: [StudentSchema]
    }, { timestamps: true }
);

module.exports = model('Course', CourseSchema);