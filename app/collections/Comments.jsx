Comments = new Mongo.Collection('comments')

let CommentSchema = new SimpleSchema({
  ownerId: {
    type: String
  }
})

Comments.attachSchema(CommentSchema)
