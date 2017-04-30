import React, { Component } from 'react';
import { Dimmer, Loader,  Segment } from 'semantic-ui-react'

import MessageList from '../components/MessageList';

const emptyMessage = {
  username: 'John Doe',
  text: 'lorem ipsum dolr sit amet...',
  ts: 1493572963,
  event_time: 1493572963,
  team_id: 'Team',
  channel: 'Channel'
};

class Messages extends Component {
  state = {
    loading: true,
    messages: [],
    error: false
  }

  componentWillMount() {
    fetch('/messages')
      .then(res => res.json())
      .then(messages => this.setState({
        loading: false,
        messages: messages
      }))
      .catch(err => this.setState({
        loading: false,
        error: err
      }))
  }

  render() {
    const {messages, loading} = this.state;
    return (
      <div>
        <Segment>
          <Dimmer active={loading}>
            <Loader>Loading</Loader>
          </Dimmer>

          { loading && <MessageList messages={[emptyMessage]} /> }

          { messages.length > 0 && <MessageList messages={messages} /> }

        </Segment>
      </div>
    )
  }
}

export default Messages;