C.TagLine = React.createClass({
  propTypes: {
    tags: React.PropTypes.array,
    handleRemove: React.PropTypes.func
  },
  handleRemove(tag) {
    if (this.props.handleRemove) {
      this.props.handleRemove(tag)
    }
  },
  renderTags() {
    return this.props.tags.map((tag) => {
      return <C.Tag key={tag._id} tag={tag} handleRemove={this.handleRemove}/>
    })
  },
  render () {
    return (
      <div className="tagline">
        {this.renderTags()}
        <C.TagSearch/>
      </div>
    )
  }
})
