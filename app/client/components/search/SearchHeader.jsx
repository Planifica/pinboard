C.SearchHeader = React.createClass({
  mixins: [],
  getInitialState() {
    return {
      tags: [],
      tagName: ''
    }
  },
  searchTags(event) {
    let name = $(event.target).val()
    Meteor.call('searchTags', name, function(err, res) {
      this.setState({ tags: res })
    }.bind(this))
  },
  renderMainHeader() {
    ReactLayout.render(C.MainLayout, {
      header: <C.MainHeader />,
      content: <C.Boards />,
      footer: <C.MainFooter />
    })
  },
  searchContentWithTagName(event) {
    let name = $(event.target).attr('id')
    this.setState({
      tagName: name,
      tags: []
    })
  },
  handleChange(event) {
    this.setState({ tagName: event.target.value })
  },
  render() {
    let tags = this.state.tags
    let self = this
    let tagsList = (
      <ul>
      {tags.map(function(result) {
        return <li id={result.name} onClick={self.searchContentWithTagName}>{result.name}</li>
      })}
      </ul>
    )

    let input = (
        <form className="search-form">
            <input id="searchInput"
            value={this.state.tagName}
            onChange={this.handleChange}
            className="u-full-width"
            type="text"
            placeholder={TAPi18n.__('search-placeholder')}
            id="search"
            onKeyUp={this.searchTags}
            autoComplete="off"/>
            {tagsList}
        </form>
    )
    let close = (
      <C.IconButton icon="ion-close-round" onClick={this.renderMainHeader} className="close-search-button"/>
    )

    return (
      <header className="private">
        <C.Toolbar center={input} right={close}/>
      </header>
    )
  }
})
