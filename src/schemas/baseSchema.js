module.exports = function baseSchema (schema, options) {
  schema.add({ created_at: Date, updated_at: Date })
  
  schema.pre('save', function (next) {
    this.updated_at = new Date();
    next()
  })

  schema.pre('save', function (next) {
    if (this.isNew)
      this.created_at = new Date();
    next()
  })
};