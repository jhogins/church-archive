var ItemList = React.createClass({
  getInitialState: function() {
    return {
      items: []
    };
  },
  componentDidMount: function(e) {
    this.serverRequest = $.ajax({
      url: this.props.source, 
      cache: false, 
      success: function(result) {
        this.setState({items: result});
    }.bind(this)});
  },
  render: function() {
    var dgDisplayItem = function(item, index) {
      return (
        <div key={index} className="item">
          <div className="row">
            <div className="text-center col-sm-2 row">
              <div className="text-center col-xs-6">
                <a download href={'http://sermons.rentonbiblechurch.org/sermons/' + item.DATE + '.mp3'}>
                  <h1><span className="glyphicon glyphicon-download"></span></h1>
                </a>
              </div>
              <div className="text-center col-xs-6">
                <a href={'http://sermons.rentonbiblechurch.org/sermons/' + item.DATE + '.mp3'}>
                  <h1><span className="glyphicon glyphicon-play-circle"></span></h1>
                </a>
              </div>
            </div>
            <div className="col-sm-6"><h4>{item.TITLE}</h4>
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

    