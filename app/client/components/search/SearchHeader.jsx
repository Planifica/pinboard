C.SearchHeader = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },
  renderMainHeader() {
    ReactLayout.render(C.MainLayout, {
      header: <C.MainHeader />,
      content: <C.Boards />,
      footer: <C.MainFooter />
    })
  },
  render() {

    let input = (
        <form className="search-form">
            <input className="u-full-width" type="text" placeholder="Tag1" id="search"/>
            <ul>
              <li>tag1</li>
              <li>tag2</li>
              <li>tag3</li>
              <li>tag1</li>
            </ul>
        </form>
    )
    let close = (
      <C.IconButton icon="ion-close-round" onClick={this.renderMainHeader}/>
    )

    return (
      <header className="private">
        <C.Toolbar center={input} right={close}/>
      </header>
    )
  }
})
