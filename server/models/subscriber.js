'use strict'

const mongoose = require('mongoose')

const SubscriberSchema = new mongoose.Schema({
  endpoint: {
    type: String
  },
  // keys: {
  //   type: mongoose.SchemaType.Mixed
  // }
},
{
  timestamps: true,
  versionKey: false
});


module.exports = mongoose.model('Subscriber', SubscriberSchema)