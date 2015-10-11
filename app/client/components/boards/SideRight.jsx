C.SideRight = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
    }
  },

  render() {
    return (
      <div className={'sidebar ' + this.props.className}>
        <C.Toolbar left={this.props.toolbarLeft} center={this.props.toolbarCenter} right={this.props.toolbarRight}/>
        {this.props.content}
      </div>
    )
  }
})
