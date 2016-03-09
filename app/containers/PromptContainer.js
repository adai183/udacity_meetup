var React = require('react');
var Prompt = require('../components/Prompt');

var PromptContainer = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      myState: false,
      errorMsg1: [],
      errorMsg2: []
    }
  },
  handleSubmitForm: function (e) {
    e.preventDefault();

    var username = this.state.username;
    var email = this.state.email;
    var password = this.state.password;
    var repeatPassword = this.state.repeatPassword;

    /*
    I'm using this IssueTracker to help me format my validation messages.
    */
    function IssueTracker() {
      this.issues = [];
    }
    IssueTracker.prototype = {
      add: function (issue) {
        this.issues.push(issue);
      },
      retrieve: function () {
        var message = "";
        switch (this.issues.length) {
          case 0:
            // do nothing because message is already ""
            break;
          case 1:
            message = "Please correct the following issue" + this.issues[0];
            break;
          default:
            message = "Please correct the following issues" + this.issues.join("\n");
            break;
        }
        return message;
      }
    };

    /*
    Make an issue tracker for each input because some validation messages should
    end up on the first one, some on the second.
     */
    var firstInputIssuesTracker = new IssueTracker();
    var secondInputIssuesTracker = new IssueTracker();

    /*
    This steps through all of the requirements and adds messages when a requirement fails.
    Just checks the first password because the second should be the same when it runs.
     */
    function checkRequirements() {
      if (password.length < 16) {
        firstInputIssuesTracker.add("fewer than 16 characters");
      } else if (password.length > 100) {
        firstInputIssuesTracker.add("greater than 100 characters");
      }

      if (!password.match(/[\!\@\#\$\%\^\&\*]/g)) {
        firstInputIssuesTracker.add("missing a symbol (!, @, #, $, %, ^, &, *)");
      }

      if (!password.match(/\d/g)) {
        firstInputIssuesTracker.add("missing a number");
      }

      if (!password.match(/[a-z]/g)) {
        firstInputIssuesTracker.add("missing a lowercase letter");
      }

      if (!password.match(/[A-Z]/g)) {
        firstInputIssuesTracker.add("missing an uppercase letter");
      }

      var illegalCharacterGroup = password.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)
      if (illegalCharacterGroup) {
        illegalCharacterGroup.forEach(function (illegalChar) {
          firstInputIssuesTracker.add("includes illegal character: " + illegalChar);
        });
      }
    };

    /*
    Here's the first validation check. Gotta make sure they match.
     */
    if (password === repeatPassword && password.length > 0) {
      /*
      They match, so make sure the rest of the requirements have been met.
       */
      checkRequirements();
    } else {
      secondInputIssuesTracker.add("Passwords must match!");
    }

    /*
    Get the validation message strings after all the requirements have been checked.
     */
    var firstInputIssues = firstInputIssuesTracker.retrieve()
    var secondInputIssues = secondInputIssuesTracker.retrieve()



    this.setState({
      errorMsg1: firstInputIssuesTracker.issues,
      errorMsg2: secondInputIssuesTracker.issues
    });

    /*
    You would probably replace this with a POST message in a real app.
     */
    if (firstInputIssues.length + secondInputIssues.length === 0) {
      alert("Password change successful!");
    }

  },
  handleUpdateUser: function (event) {
    this.setState({
      username: event.target.value
    });
  },
  handleUpdateEmail: function (event) {
    this.setState({
      email: event.target.value
    });
  },
  handleUpdatePassword: function (event) {
    this.setState({
      password: event.target.value
    });
  },
  handleUpdaterepeatPassword: function (event) {
    this.setState({
      repeatPassword: event.target.value
    });
  },

  render: function () {
    return (
      <Prompt
        onSubmitForm={this.handleSubmitForm}
        onUpdateUser={this.handleUpdateUser}
        onUpdateEmail={this.handleUpdateEmail}
        onUpdatePassword={this.handleUpdatePassword}
        onUpdaterepeatPassword={this.handleUpdaterepeatPassword}
        myState={this.state.myState}
        errorMsg1={this.state.errorMsg1}
        errorMsg2={this.state.errorMsg2}
        username={this.state.username}
        email={this.state.email}
        password={this.state.password}
        repeatPassword={this.state.repeatPassword} />
    )
  }
});

module.exports = PromptContainer;
