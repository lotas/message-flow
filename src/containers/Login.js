import React, { Component } from 'react';
import { Dimmer, Loader,  Segment, Container, Button, Rail } from 'semantic-ui-react'

import config from '../config';

class Login extends Component {
  state = {
  }

  render() {

    return (
      <div>
        <Segment>

          <a href={config.slackAuthLink}>
            <img alt="Sign in with Slack" height="40" width="172"
              src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
              srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" />
          </a>

        </Segment>
      </div>
    )
  }
}

export default Login;