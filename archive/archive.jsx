var ItemList = React.createClass({
  getInitialState: function() {
    return {
      items: []
    };
  },
  componentDidMount: function(e) {
    this.serverRequest = $.get(this.props.source, function(result) {
      this.setState({items: result});
    }.bind(this));
  },
  render: function() {
    var dgDisplayItem = function(item, index) {
      return (
        <div key={index} className="item">
          <div className="row">
            <div className="col-sm-8"><h4>{item.TITLE}</h4>
              <h5>{item["SCRIPTURE REF"]}</h5></div>
            <div className="col-sm-4"><h5>{item.DATE}</h5></div>
          </div>
        </div>
        );
    };
    return (
      <div>
        <div className="container">
          {this.state.items.map(dgDisplayItem)}
        </div>
      </div>
    );
  }
});
ReactDOM.render(
  <ItemList source="sermonarchive.json"/>,
  document.getElementById('data')
);

    