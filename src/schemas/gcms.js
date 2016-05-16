var mongoose = require('mongoose');
mongoose.plugin(require('./baseSchema'));
var Schema = mongoose.Schema;

var Gcms = new Schema({
  token: String,
  users: [{type: Schema.Types.ObjectId, ref:"Users"}],
  from: {type: Schema.Types.ObjectId, ref:"Users"},
  to: {type: Schema.Types.ObjectId, ref:"Users"},
  message: String,
});

module.exports = Gcms;

// Messages.find({ from: 'ni', to: 'wangtong' } huozhe { from: 'wangtong', to: 'ni' }).sortbyDate()
// Messages.find({ from: 'wangtong', to: 'ni' })