var React = require('react');
var Reactfire = require('reactfire');
var Firebase = require('firebase');
var rooturl = 'https://udacity-meet-up.firebaseio.com/';
var ref = new Firebase(rooturl);
window.authData = ref.getAuth();
var moment = require('moment');
var now = moment().format();



var CreateMeetUp = require('../components/CreateMeetUp');

var CreateMeetUpContainer = React.createClass({
  mixins: [Reactfire],
  getInitialState: function () {
    return {
      username: '',
      eventname: '',
      eventtype: '',
      startdate: '',
      enddate: '',
      errorMsg1: [],
      errorMsg2: []
    }
  },
  componentWillMount: function(){

    var userIn = ref.getAuth()
    console.log(userIn);
    var userRef = new Firebase(rooturl + 'users/' + userIn.uid);

    // Attach an asynchronous callback to read the data at our posts reference
    userRef.once("value", function(snapshot) {
      console.log(snapshot.val().username);
      var username = snapshot.val().username;
      this.setState({
        username: username
      });
    }.bind(this),
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },
  handleSubmitForm: function (e) {
    e.preventDefault();

  },
  handleUpdateEventName: function (event) {
    this.setState({
      eventname: event.target.value
    });
  },
  handleUpdateEventType: function (event) {
    this.setState({
      eventtype: event.target.value
    });
  },
  handleUpdateStartDate: function (newDate) {
    newDate = parseInt(newDate)
    newDate = moment(newDate).format();
    console.log("newDate", newDate);
    this.setState({
      startdate: newDate
    });
  },
  handleUpdateEndDate: function (newDate) {
    newDate = parseInt(newDate)
    newDate = moment(newDate).format();
    console.log("newDate", newDate);
    this.setState({
      enddate: newDate
    });
  },
  render: function () {
    return (
      <CreateMeetUp
        onSubmitForm={this.handleSubmitForm}
        onUpdateEventName={this.handleUpdateEventName}
        onUpdateEventType={this.handleUpdateEventType}
        onUpdateStartDate={this.handleUpdateStartDate}
        onUpdateEndDate={this.handleUpdateEndDate}
        renderError1={this.renderError1}
        renderError2={this.renderError2}
        errorMsg1={this.state.errorMsg1}
        errorMsg2={this.state.errorMsg2}
        username={this.state.username}
        eventname={this.state.eventname}
        eventtype={this.state.eventtype}
         />
    )
  }
});

module.exports = CreateMeetUpContainer;
