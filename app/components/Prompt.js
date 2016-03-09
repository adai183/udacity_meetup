var React = require('react');
var PropTypes = React.PropTypes;
var transparentBg = require('../styles').transparentBg;

function Prompt (props) {
  return (
    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
      <h1>Sign up</h1>

      <form onSubmit={props.onSubmitForm}>
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
        <div className="col-sm-12">
          <div className="form-group">
            <label> password
              <div data-tip={props.errorMsg1}>
                <input
                  className='form-control'
                  id='first'
                  onChange={props.onUpdatePassword}
                  maxLength="100"
                  required
                  type='password'
                  value={props.password} />
              </div>
            </label>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <label> repeat password
              <div data-tip={props.errorMsg2}>
                <input
                  className='form-control'
                  id='second'
                  onChange={props.onUpdateRepeatPassword}
                  maxLength="100"
                  required
                  type='password'
                  value={props.repeatPassword} />
              </div>
            </label>
          </div>
        </div>
        <div className="col-sm-4 col-sm-offset-4">
          <div className="form-group">
            <button
              className="btn btn-block btn-success"
              type="submit">
                Join
            </button>
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
  onUpdateRepeatPassword: PropTypes.func.isRequired,

  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  repeatPassword: PropTypes.string.isRequired,
  myState: PropTypes.bool.isRequired,
  errorMsg1: PropTypes.string.isRequired,
  errorMsg2: PropTypes.string.isRequired,
}

module.exports = Prompt
