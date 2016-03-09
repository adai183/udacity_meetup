var React = require('react');
var PropTypes = React.PropTypes;
var transparentBg = require('../styles').transparentBg;
var errorMsg = require('../styles').errorMsg;


function Prompt (props) {
  return (
    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
      <h1>Sign up</h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="error-msg" style={errorMsg}>
              {props.errorMsg1}
              {props.errorMsg2}
            </div>
          </div>
        </div>
      <form onSubmit={props.onSubmitForm}>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label> username
                <input
                  className='form-control'
                  onChange={props.onUpdateUser}
                  placeholder='JohnDoe'
                  maxLength="100"
                  autofocus
                  required
                  type='text'
                  value={props.username} />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label> email
                <input
                  className='form-control'
                  onChange={props.onUpdateEmail}
                  placeholder='john.doe@gmail.com'
                  maxLength="100"
                  required
                  type='email'
                  value={props.email} />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label> password
                <input
                  className='form-control'
                  id='first'
                  onChange={props.onUpdatePassword}
                  maxLength="100"
                  required
                  type='password'
                  value={props.password} />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label> repeat password
                <input
                  className='form-control'
                  id='second'
                  onChange={props.onUpdaterepeatPassword}
                  maxLength="100"
                  required
                  type='password'
                  value={props.repeatPassword} />
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
                  Join
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

Prompt.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onUpdateEmail: PropTypes.func.isRequired,
  onUpdatePassword: PropTypes.func.isRequired,
  onUpdaterepeatPassword: PropTypes.func.isRequired,

  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  repeatPassword: PropTypes.string.isRequired,
  myState: PropTypes.bool.isRequired,
  errorMsg1: PropTypes.array.isRequired,
  errorMsg2: PropTypes.array.isRequired,
}

module.exports = Prompt
