Meteor.publish('notes', function () {
  return Notes.find({
    //ownerId: this.userId
  })
})
