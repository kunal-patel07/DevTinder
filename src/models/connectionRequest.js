const mongoose = require("mongoose");
 
const connectionRequestSchema = mongoose.Schema(
  {
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{values} is incorrect status`,
      },
    },
  },
  { timestamps: true },
);

connectionRequestSchema.index({toUserId : 1 , fromUserId : 1})



// connectionRequestSchema.pre("save",function(next) { 
 
//   const connectionRequest =this;

//   if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
//     return new Error("cannot send request to yourself"); 
//   }
//   next();
//  })



const connectionRequestModel =new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);



module.exports = connectionRequestModel;
