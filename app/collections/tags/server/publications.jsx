Meteor.publish('tags', function(name) {
  return Tags.find({ name: '/' + name + '/' })
})

Meteor.methods({
  searchTags: function(name) {
    if (name.length === 0) {
      return []
    }
    return Tags.find({ name: new RegExp(name, 'i') }).fetch()
  }
})
