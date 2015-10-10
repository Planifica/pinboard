// Any client may insert, update, or remove a post without restriction
Boards.permit(['insert', 'update', 'remove']).apply()

// permit users to create boards that they own and are a member of
Boards.permit(['insert', 'update', 'remove'])
  .ifIsOwnedByCurrentUser()
  .ifCurrentUserIsMember()
  .apply()
