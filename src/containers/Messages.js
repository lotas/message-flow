import React, { Component } from 'react';
import { Dimmer, Loader,  Segment, Container, Button, Rail } from 'semantic-ui-react'

import MessageList from '../components/MessageList';
import Stats from '../components/Stats';

const DEFAULT_PAGE_SIZE = 50;

const emptyMessage = {
  _id: +new Date(),
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
    error: false,
    skip: 0,
    stats: {}
  }

  loadMessages(limit=DEFAULT_PAGE_SIZE, skip=0) {
    this.setState({
      loading: true,
      error: false,
      skip: skip
    });

    fetch(`/messages/?limit=${limit}&skip=${skip}`)
      .then(res => res.json())
      .then(messages => this.setState({
        loading: false,
        messages: skip > 0 ? this.state.messages.concat(messages) : messages
      }))
      .catch(err => this.setState({
        loading: false,
        error: err
      }))
  }

  loadStats() {
    fetch(`/messages/stats`)
      .then(res => res.json())
      .then(stats => this.setState({
        stats: stats
      }))
      .catch(err => this.setState({
        loading: false,
        error: err
      }))
  }

  componentWillMount() {
    this.loadMessages()
    this.loadStats()
  }

  render() {
    const {messages, loading} = this.state;

    return (
      <div>
        <Segment>
          <Loader active={loading}>Loading</Loader>

          <Container style={{clear: 'both'}}>
            <Button
              content='Reload'
              icon='refresh'
              color='blue'
              basic
              style={{float: 'right'}}
              onClick={() => this.loadMessages()}
            />
            <Stats {...this.state.stats} />
          </Container>


          { messages.length > 0 && <MessageList messages={messages} /> }

          { messages.length > 0 &&
          <Segment textAlign='center'>
            <Button
              content='Load more'
              icon='arrow down'
              color='blue'
              basic
              onClick={() => this.loadMessages(DEFAULT_PAGE_SIZE, this.state.skip + DEFAULT_PAGE_SIZE)}
             />
          </Segment>
        }
        </Segment>
      </div>
    )
  }
}

export default Messages;