const mongoose = require("mongoose");
const schema = mongoose.Schema;

const setSchema = new schema({
    setNumber: Number,
    weightUsed: Number,
    reps: Number,
});

const userWorkoutHistorySchema = new schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        date: {
            type: Date,
            default: Date.now,
        },
        exerciseName: {
            type: String,
            required: true,
        },
        sets: [setSchema],
    },
    { timestamps: true },
);
userWorkoutHistorySchema.index({userId:1,exerciseName:1,date:-1})
const userWorkoutHistory=mongoose.model("userWorkoutHistorySchema",userWorkoutHistorySchema)

module.exports=userWorkoutHistory

