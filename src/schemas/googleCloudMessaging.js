var mongoose = require('mongoose');
mongoose.plugin(require('./baseSchema'));
var Schema = mongoose.Schema;

var GoogleCloudMessaging = new Schema({
  
  user: {type: Schema.Types.ObjectId, ref:"Users"},
  tokens: [String],
});

module.exports = GoogleCloudMessaging;

// Messages.find({ from: 'ni', to: 'wangtong' } huozhe { from: 'wangtong', to: 'ni' }).sortbyDate()
// Messages.find({ from: 'wangtong', to: 'ni' })