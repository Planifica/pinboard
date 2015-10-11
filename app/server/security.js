// Any client may insert, update, or remove a post without restriction
Boards.permit(['insert', 'update', 'remove']).never().apply()

// permit users to create boards that they own and are a member of
Boards.permit(['insert', 'update', 'remove'])
  .ifIsOwnedByCurrentUser()
  .ifCurrentUserIsMember()
  .apply()

Notes.permit(['insert', 'update', 'remove']).never().apply()

// permit users to modify boards that they own
Notes.permit(['insert', 'update', 'remove'])
  .ifIsOwnedByCurrentUser()
  .apply()

Tags.permit(['insert', 'update', 'remove']).never().apply()

// permit users to modify boards that they own
Tags.permit(['insert'])
  .apply()

Comments.permit(['insert', 'update', 'remove']).apply()
