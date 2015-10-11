C.TagLine = React.createClass({
  propTypes: {
    tags: React.PropTypes.array,
    handleRemove: React.PropTypes.func,
    handleSelect: React.PropTypes.func,
    tagNotFoundWithName: React.PropTypes.func
  },
  handleRemove(tagId) {
    if (this.props.handleRemove) {
      this.props.handleRemove(tagId)
    }
  },
  handleSelect(tagId) {
    if (this.props.handleSelect) {
      this.props.handleSelect(tagId)
    }
  },
  tagNotFoundWithName(tag) {
    if (this.props.tagNotFoundWithName) {
      this.props.tagNotFoundWithName(tag)
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
        <C.TagSearch handleSelect={this.handleSelect} tagNotFoundWithName={this.tagNotFoundWithName}/>
      </div>
    )
  }
})
