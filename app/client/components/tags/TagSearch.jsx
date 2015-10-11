C.TagSearch = React.createClass({
  propTypes: {
    handleSelect: React.PropTypes.func,
    tagNotFoundWithName: React.PropTypes.func
  },
  getInitialState() {
    return {
      tags: [],
      searchStr: ''
    }
  },
  /* Fetches tags from the server */
  searchTags(event) {
    let name = $(event.target).val()
    let boardId = FlowRouter.getParam('boardId')
    const keyCode = event.keyCode
    Meteor.call('searchTags', name, boardId, (err, res) => {
      // if there is no result and the user pressed enter
      // we want to tell the parent component about this
      if (res.length === 0 && keyCode === 13) {
        if (this.props.tagNotFoundWithName) {
          this.props.tagNotFoundWithName(name)
        }
      }
      this.setState({ tags: res })
    })
  },
  handleChange(event) {
    this.setState({ searchStr: event.target.value })
  },
  handleSelect (event) {
    let _id = $(event.target).attr('id')
    if (this.props.handleSelect) {
      this.props.handleSelect(_id)
    }
    this.setState({ searchStr: '', tags: [] })
  },
  render () {
    let activeClass = this.state.tags.length > 0 ? 'tags-result-list active' : 'tags-result-list'
    let tagsList = (
      <ul className={activeClass}>
      {this.state.tags.map((tag) => {
        return <li id={tag._id} onClick={this.handleSelect}>{tag.name}</li>
      })}
      </ul>
    )
    return (
      <div className="tag-search">
          <input
          value={this.state.searchStr}
          onChange={this.handleChange}
          type="text"
          placeholder={TAPi18n.__('searchPlaceholder')}
          onKeyUp={this.searchTags}
          autoComplete="off"/>
          {tagsList}
      </div>
    )
  }
})
