Security.defineMethod('ifIsOwnedByCurrentUser', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc.ownerId
  }
})

Security.defineMethod('ifCurrentUserIsMember', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return !_.contains(doc.members, userId)
  }
})
