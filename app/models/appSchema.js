var mongoose=require('mongoose');
var Schema = mongoose.Schema
var bcrypt= require('bcrypt-nodejs');
var SALT_WORK_FACTOR=10;
var inventorySchema= new Schema({
    category: {type:Schema.Types.ObjectId,  ref:'category'},
    subCategory:{type:Schema.Types.ObjectId, ref:'subcategory'},
    productManager:{type:Schema.Types.ObjectId, ref:'user'},
    // type:{type:String, required:true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    address:String,
    lg:String,
    state:String,
    country:String,
    profilePic:String,
    allPic:String,
    status:String,
    rate:Number,
    keyFeatures:[{type:Schema.Types.ObjectId, ref:'keyFeatures'}],
    inventorySettings:{type:Schema.Types.ObjectId, ref:'inventorySettings'},
    specifications:[{type:Schema.Types.ObjectId, ref:'specifications'}],
    offerDetails:[{type:Schema.Types.ObjectId, ref:'offerDetails'}],
    offerConditions:[{type:Schema.Types.ObjectId, ref:'offerConditions'}],
    likes:[{type:Schema.Types.ObjectId, ref:'likes'}],
    comments:[{type:Schema.Types.ObjectId, ref:'comments'}],
    dateCreated:{ type: Date, default: Date.now },
    lastUpdated:{ type: Date, default: Date.now }
});
var deliveryAddressSchema= new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'user'},
    street:String,
    landMark:String,
    localGovernment: String,
    city:String,
    State:String
})
var keyFeaturesSchema= new Schema({
    title: String,
    description: String,
    inventoryId:{type:Schema.Types.ObjectId, ref:'inventory'},
    dateCreated:{type: Date, default: Date.now}
});

var specificationSchema= new Schema({
    title: String,
    description: String,
    inventoryId:{type:Schema.Types.ObjectId, ref:'inventory'},
    dateCreated:{type: Date, default: Date.now}
});
var offerDetailsSchema= new Schema({
    title: String,
    description: String,
    inventoryId:{type:Schema.Types.ObjectId, ref:'inventory'},
    dateCreated:{type: Date, default: Date.now}
});
var offerConditionsSchema= new Schema({
    title: String,
    description: String,
    inventoryId:{type:Schema.Types.ObjectId, ref:'inventory'},
    dateCreated:{type: Date, default: Date.now}
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
    inventoryId:{type:Schema.Types.ObjectId, ref:'inventory'},
    dateCreated:{type: Date, default: Date.now}
});
var categorySchema= new Schema({
    name: {type:String, required:true, index:{unique:true, dropDups: true}},
    description: {type:String, required:true, index:{unique:true, dropDups: true}},
    avartar:String,
    dateCreated:{type: Date, default: Date.now}
})
var typeSchema= new Schema({
    name: {type:String, required:true, index:{unique:true, dropDups: true}},
    description: {type:String, required:true, index:{unique:true, dropDups: true}},
    avartar:String,
    dateCreated:{type: Date, default: Date.now}
})
var orderSchema= new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'user', required:true},
    deliveryDate:{type: Date, required:true},
    inventory:{type:Schema.Types.ObjectId, ref:'inventory',  required: true},
    orderDate:{type: Date, default: Date.now},
    subscriptionId:{type:Schema.Types.ObjectId, ref:'subscribedPlan',  required: true },
    status:{type:String, default:'placed'},
    dateCreated:{type: Date, default: Date.now}
})
var subscribedPlanSchema= new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'user', required:true},
    planId:{type:Schema.Types.ObjectId, ref:'plan',  required: true},
    status:{type:String, default: 'active'},
    subscribedDate:{type: Date,  default: Date.now},
    dateCreated:{type: Date, default: Date.now}
})
var planSchema= new Schema({
    name:String,
    amount:Number,
    mealNumber:Number,
    discount:Number,
    dateCreated:{type: Date, default: Date.now}
})
var userSchema= new Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    location:String,
    email:{type:String, required:true, index:{unique:true, dropDups: true}},
    password:{type:String, required:true},
    phone:{type:String, required:true},
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
module.exports.inventory = mongoose.model('inventory', inventorySchema);
module.exports.category= mongoose.model('category', categorySchema);
module.exports.type= mongoose.model('type', typeSchema);
module.exports.inventorySettings = mongoose.model('inventorySettings', inventorySettingsSchema);
module.exports.orders = mongoose.model('orders', orderSchema);
module.exports.plan = mongoose.model('plan', planSchema);
module.exports.subscribedPlan = mongoose.model('subscribedPlan', subscribedPlanSchema);
module.exports.user = mongoose.model('user', userSchema);
module.exports.tags = mongoose.model('tags', tagSchema);
module.exports.emailSubscriber = mongoose.model('emailSubscriber', emailSubscriberSchema);
module.exports.keyFeatures = mongoose.model('keyFeatures', keyFeaturesSchema);
module.exports.specifications= mongoose.model('specifications', specificationSchema);
module.exports.offerDetails = mongoose.model('offerDetails', offerDetailsSchema);
module.exports.offerConditions = mongoose.model('offerConditions', offerConditionsSchema);
module.exports.likes = mongoose.model('likes', likesSchema);
module.exports.comments = mongoose.model('comments', commentsSchema);
