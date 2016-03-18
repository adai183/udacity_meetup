var React = require('react');
var PropTypes = React.PropTypes;
var transparentBg = require('../styles').transparentBg;
var errorMsg = require('../styles').errorMsg;
var DateTimeField = require('react-bootstrap-datetimepicker');
var Geosuggest = require('react-geosuggest');

function CreateMeetUp (props) {

  return (
    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
      <h1>Welcome, {props.username} !</h1>
      <p> Create your first meetup</p>
        <div className="row">
          <div className="col-sm-12">
            <div className="error-msg" style={errorMsg}>
              <ul className="error-list">
                {props.errorMsg1}
              </ul>
            </div>
          </div>
        </div>
      <form onSubmit={props.onSubmitForm} autoComplete="on">
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label> name of the event
                <input
                  className='form-control'
                  onChange={props.onUpdateEventName}
                  placeholder='udacious meetup'
                  maxLength="100"
                  autofocus
                  required
                  type='text'
                  value={props.eventname} />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label> event type
                <input
                  className='form-control'
                  list='eventType'
                  onChange={props.onUpdateEventType}
                  placeholder='meet&greet'
                  maxLength="100"
                  autofocus
                  required
                  type='text'
                  value={props.eventtype} />
                <datalist id="eventType">
                  <option value="meet&greet" />
                  <option value="conference talk" />
                  <option value="workshop" />
                  <option value="hiring event"/>
                  <option value="intersect" />
                </datalist>
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label>  start
                <DateTimeField
                  onChange={props.onUpdateStartDate}
                   />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label>  end
                <DateTimeField
                  onChange={props.onUpdateEndDate}
                  />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label> location
                <Geosuggest
                  onSuggestSelect={props.getCoords} />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label> Guestlist
                <input
                  className='form-control'
                  onChange={props.onUpdateGuestlist}
                  placeholder='john, adele, lucy'
                  maxLength="100"
                  autofocus
                  required
                  type='text'
                  value={props.guestlist} />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <div className="form-group">
              <button
                className="btn btn-block btn-success"
                type="submit">
                  Create Meetup
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

CreateMeetUp.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  onUpdateEventName: PropTypes.func.isRequired,
  onUpdateEventType: PropTypes.func.isRequired,
  onUpdateStartDate: PropTypes.func.isRequired,
  onUpdateEndDate: PropTypes.func.isRequired,
  onUpdateGuestlist: PropTypes.func.isRequired,
  getCoords: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  eventname: PropTypes.string.isRequired,
  guestlist: PropTypes.string.isRequired,
  errorMsg1: PropTypes.array.isRequired,
  errorMsg2: PropTypes.array.isRequired,
}

module.exports = CreateMeetUp;
