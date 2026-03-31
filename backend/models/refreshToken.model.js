const mongoose=require('mongoose')
const Schema=mongoose.Schema

const refreshTokenSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    refreshToken: String,
  },
  { timestamps: true },
);

const RefreshToken=mongoose.model("RefreshTokenSchema",refreshTokenSchema)

module.exports=RefreshToken

