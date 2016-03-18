var React = require('react');
var Reactfire = require('reactfire');
var Firebase = require('firebase');
var rooturl = 'https://udacity-meet-up.firebaseio.com/';
var ref = new Firebase(rooturl);
window.authData = ref.getAuth();
var moment = require('moment');
var now = moment().format('x');



var CreateMeetUp = require('../components/CreateMeetUp');

var CreateMeetUpContainer = React.createClass({
  mixins: [Reactfire],
  getInitialState: function () {
    return {
      username: '',
      eventname: '',
      eventtype: '',
      startdate: now,
      enddate: now,
      guestlist: '',
      errorMsg1: [],
      errorMsg2: [],
      lat: '',
      lng: ''
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
    console.log(this.state.errorMsg1);
    var self = this;

    if(this.state.errorMsg1.length===0){
      console.log('check');
      var formattedStartDate = moment(this.state.startdate).format();
      var formattedEndDate = moment(this.state.enddate).format();
      ref.child("meetups").set({
        creator: self.state.username,
        eventname: self.state.eventname,
        eventtype: self.state.eventtype,
        startdate: formattedStartDate,
        enddate: formattedEndDate,
        lat: this.state.lat,
        lng: this.state.lng
      });
      window.location= "/dist/map.html";
    }
  },
  validateDates: function () {
    if(this.state.startdate > this.state.enddate){
      this.setState({
        errorMsg1:'Sorry... check your date/time input. Your meetup ends before it starts.'
      })
    }else if (this.state.startdate < now) {
      this.setState({
        errorMsg1:'Please check your date/time input. Your meetup is happening in the past'
      })
    }else
    {
      this.setState({
        errorMsg1: []
      })
    }
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
    this.setState({
      startdate: newDate
    });
    setTimeout(
      this.validateDates, 500
    );
  },
  handleUpdateEndDate: function (newDate) {
    newDate = parseInt(newDate)
    console.log(newDate);
    this.setState({
      enddate: newDate
    });
    setTimeout(
      this.validateDates, 500
    );
  },
  getCoords: function (suggest) {
    console.log(suggest.location);
    this.setState({
      lat: suggest.location.lat,
      lng: suggest.location.lng
    });
  },
  handleUpdateGuestlist: function (event) {
    this.setState({
      guestlist: event.target.value
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
        onUpdateGuestlist={this.handleUpdateGuestlist}
        getCoords={this.getCoords}
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
