C.BoardCreationThumbnail = React.createClass({
  getInitialState: function() {
    return {
      formVisible: false,
      errors: {
        title: false
      }
    }
  },
  showForm() {
    if (!this.state.formVisible) {
      this.setState({
        formVisible: true
      })
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    // Find the text field via the React ref
    const titleInput = $(event.target).find('[name=title]')
    let errors = {}

    if (!titleInput.val()) {
      errors.title = 'required'
    } else {
      errors.title = false
    }

    this.setState({
      errors: errors
    })

    // if there was an error with the title stop here
    if (errors.title) {
      return
    }

    const newBoard = Boards.insert({
      name: titleInput.val()
    })

    if (newBoard) {
      // Clear form
      titleInput.val('')
      this.setState({
        formVisible: false
      })
    }
  },

  renderContent() {
    let render

    if (this.state.formVisible) {
      render = (
        <form id="createBoard" className="create-board-form" onSubmit={this.handleSubmit}>
            <C.FormInput
              hasError={!!this.state.errors.title}
              name="title"
              type="text"
              label={TAPi18n.__('boardName')}
              placeholder={TAPi18n.__('newBoard')}
              classExtendInput="u-full-width" />
            <button type="submit" className="u-full-width">
              {TAPi18n.__('create')}
            </button>
        </form>
      )
    } else {
      render = <i className="ion-ios-plus-empty"></i>
    }
    return render
  },

  render () {
    return (
      <div
        className="board-thumbnail bord-creation-thumbnail"
        onClick={this.showForm}>
        {this.renderContent()}
      </div>
    )
  }
})
