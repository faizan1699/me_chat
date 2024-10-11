
import moongose from moongose;

const userSchema = new moongose.Schema({

    username: {
        type:String
    },
    email: {
        type: String,
        required: [true , "email required"]
    },
    password: {
        type: String,
        required: [true , "password required"]
    }

})