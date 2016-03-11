var React = require('react');
var Reactfire = require('reactfire');
var Firebase = require('firebase');
var rooturl = 'https://udacity-meet-up.firebaseio.com/';
var ref = new Firebase(rooturl);
window.authData = ref.getAuth();

var Prompt = require('../components/Prompt');

var PromptContainer = React.createClass({
  mixins: [Reactfire],
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
  componentWillMount: function(){
    console.log(ref.getAuth());
  },
  handleSubmitForm: function (e) {
    e.preventDefault();
    var self = this;

    // check wether input is valid on the client side
    if(self.state.errorMsg1+self.state.errorMsg2 ==="" && self.state.repeatPassword !=""){

      // Create new user on firebase database
      ref.createUser({
        email: self.state.email,
        password: self.state.password
      },
      function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);

          // Save user profile
          // we would probably save a profile when we register new users on our site
          // we could also read the profile to see if it's null
          // here we will just simulate this with an isNewUser boolean
          var isNewUser = true;
          if(isNewUser){
            ref.child("users").child(userData.uid).set({
              username: self.state.username,
              email: self.state.email,
              password: self.state.password
            });
          };

          // authenticate this new user
          ref.authWithPassword({
            email    : self.state.email,
            password : self.state.password
            },
            function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              console.log("Authenticated successfully with payload:", authData);
            }
          });
        }
      });
      // redirect user when input is valid
      window.location= "/#/battle";
    }
  },
  validateInput:function () {
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
      if (password!==repeatPassword && repeatPassword.length > 0) {
        firstInputIssuesTracker.add("passwords must match");
      }

      if (password.length < 8) {
        firstInputIssuesTracker.add("fewer than 8 characters");
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
    if (password.length > 0 || repeatPassword.length > 0) {
      checkRequirements();
    }
    /*
    Get the validation message strings after all the requirements have been checked.
     */
    var firstInputIssues = firstInputIssuesTracker.retrieve()
    var secondInputIssues = secondInputIssuesTracker.retrieve()

    this.setState({
      errorMsg1: firstInputIssuesTracker.issues
    });
  },
  renderError1: function () {
    var errorArr1 = this.state.errorMsg1;
    if(errorArr1.length>0){
      return errorArr1.map(function (er) {
        return <li>
          {er}
        </li>
      })
    }else {
      return null
    }
  },
  renderError2: function () {
    var errorArr2 = this.state.errorMsg2;
    if(errorArr2.length>0){
      return errorArr2.map(function (er) {
        return <li>
          {er}
        </li>
      })
    }else {
      return null
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

    ///// Validation ///////
    setTimeout(
      this.validateInput, 500
    );

  },
  handleUpdaterepeatPassword: function (event) {
    var self = this;
    self.setState({
      repeatPassword: event.target.value
    });

    ///// Validation ///////
    setTimeout(
      this.validateInput, 500
    );
  },

  render: function () {
    return (
      <Prompt
        onSubmitForm={this.handleSubmitForm}
        onUpdateUser={this.handleUpdateUser}
        onUpdateEmail={this.handleUpdateEmail}
        onUpdatePassword={this.handleUpdatePassword}
        onUpdaterepeatPassword={this.handleUpdaterepeatPassword}
        renderError1={this.renderError1}
        renderError2={this.renderError2}
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
