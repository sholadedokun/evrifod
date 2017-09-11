var mongoose=require('mongoose');
var Schema = mongoose.Schema
var bcrypt= require('bcrypt-nodejs');
var SALT_WORK_FACTOR=10;
var mealSchema= new Schema({
    category: {type:Schema.Types.ObjectId,  ref:'category'},
    mealType:{type:Schema.Types.ObjectId, ref:'subcategory'},
    name:{type:String, required:true},
    description:{type:String, required:true},
    profilePic:String,
    allPic:[{type:String}],
    status:String,
    totalCalories:Number,
    foodPoints:Number,
    costPerServing:Number,
    pricePerServing:Number,
    likes:[{type:Schema.Types.ObjectId, ref:'likes'}],
    ingredients:[{type:Schema.Types.ObjectId, ref:'ingredients'}],
    comments:[{type:Schema.Types.ObjectId, ref:'comments'}],
    dateCreated:{ type: Date, default: Date.now },
    lastUpdated:{ type: Date, default: Date.now }
});

var likesSchema= new Schema({
    user: {type:Schema.Types.ObjectId, ref:'user', required:true},
    objectId:{type:Schema.Types.ObjectId, required:true},
    dateCreated:{type: Date, default: Date.now}
});
var commentsSchema= new Schema({
    user: {type:Schema.Types.ObjectId, ref:'user'},
    objectId:{type:Schema.Types.ObjectId},
    comments:String,
    dateCreated:{type: Date, default: Date.now}
});
var inventorySettingsSchema= new Schema({
    price: Number,
    discount: Number,
    inventoryId:{type:Schema.Types.ObjectId, ref:'meal'},
    dateCreated:{type: Date, default: Date.now}
});
var categorySchema= new Schema({
    name: {type:String, required:true, index:{unique:true, dropDups: true}},
    description: {type:String, required:true, index:{unique:true, dropDups: true}},
    avartar:String,
    dateCreated:{type: Date, default: Date.now}
})
var mealTypeSchema= new Schema({
    name: {type:String, required:true, index:{unique:true, dropDups: true}},
    description: {type:String, required:true, index:{unique:true, dropDups: true}},
    avartar:String,
    dateCreated:{type: Date, default: Date.now}
})
var nutritionClassSchema= new Schema({
    name: {type:String, required:true, index:{unique:true, dropDups: true}},
    description: {type:String, required:true, index:{unique:true, dropDups: true}},
    avartar:String,
    dateCreated:{type: Date, default: Date.now}
})
var ingredientsSchema= new Schema({
    nutrients:[{type:Schema.Types.ObjectId, ref:'nutritionClass'}],
    name: {type:String, required:true, index:{unique:true, dropDups: true}},
    description: {type:String, required:true, index:{unique:true, dropDups: true}},
    avartar:String,
    dateCreated:{type: Date, default: Date.now}
})
var userSchema= new Schema({
    firstName:String,
    lastName:String,
    userName:{type:String, required:true, index:{unique:true, dropDups: true}},
    location:String,
    email:{type:String, required:true, index:{unique:true, dropDups: true}},
    password:{type:String, required:true},
    phone:String,
    userTests:[{type:Schema.Types.ObjectId, ref:'inventory'}],
    userProducts:[{type:Schema.Types.ObjectId, ref:'inventory'}],
    dateCreated:{ type: Date, default: Date.now },
    lastLogin:{ type: Date, default: Date.now }
})

userSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return res.send(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return res.send(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
var tagSchema= new Schema({
    inventoryId:{type:Schema.Types.ObjectId, ref:'inventory'},
    tags:String,
    dateCreated:{ type: Date, default: Date.now },
    lastUpdated:{ type: Date, default: Date.now }
})

var emailSubscriberSchema= new Schema({
    emailAddress:String,
    source:String,
    dateCreated:{ type: Date, default: Date.now }
})
module.exports.meal = mongoose.model('meal', mealSchema);
module.exports.category= mongoose.model('category', categorySchema);
module.exports.mealType= mongoose.model('mealType', mealTypeSchema);
module.exports.nutritionClass= mongoose.model('nutritionClass', nutritionClassSchema);
module.exports.ingredients= mongoose.model('ingredients', ingredientsSchema);
module.exports.inventorySettings = mongoose.model('inventorySettings', inventorySettingsSchema);
module.exports.user = mongoose.model('user', userSchema);
module.exports.tags = mongoose.model('tags', tagSchema);
module.exports.emailSubscriber = mongoose.model('emailSubscriber', emailSubscriberSchema);
module.exports.likes = mongoose.model('likes', likesSchema);
module.exports.comments = mongoose.model('comments', commentsSchema);
