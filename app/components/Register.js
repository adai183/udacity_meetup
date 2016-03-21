var React = require('react');
var PropTypes = React.PropTypes;
var transparentBg = require('../styles').transparentBg;
var errorMsg = require('../styles').errorMsg;


function Register (props) {
  return (
    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
      <h1>Sign up</h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="error-msg" style={errorMsg}>
              <ul className="error-list">
                {props.renderError2()}
                {props.renderError1()}
              </ul>
            </div>
          </div>
        </div>
      <form onSubmit={props.onSubmitForm} autoComplete="on">
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label> username
                <input
                  className='form-control'
                  onChange={props.onUpdateUser}
                  placeholder='JohnDoe'
                  maxLength="100"
                  autoFocus
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

Register.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onUpdateEmail: PropTypes.func.isRequired,
  onUpdatePassword: PropTypes.func.isRequired,
  onUpdaterepeatPassword: PropTypes.func.isRequired,
  renderError1: PropTypes.func.isRequired,
  renderError2: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  repeatPassword: PropTypes.string.isRequired,
  errorMsg1: PropTypes.array.isRequired,
  errorMsg2: PropTypes.array.isRequired,
}

module.exports = Register;
