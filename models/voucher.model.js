'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * user Schema
 */

var VoucherSchema = new Schema({
    voucherCode : String,
    voucherNumber : String,
    productId : String,
    isAllocated : {
        type : Boolean,
        default : false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports=mongoose.model('Voucher', VoucherSchema);