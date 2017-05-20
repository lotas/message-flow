import React, { Component } from 'react';
import { Dimmer, Loader,  Segment, Container, Button, Rail } from 'semantic-ui-react'

import MessageList from '../components/MessageList';
import Stats from '../components/Stats';
import {getMessages, getStats} from '../api';

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

    getMessages(limit, skip)
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
    getStats()
      .then(stats => this.setState({
        stats: stats
      }))
      .catch(err => this.setState({
        loading: false,
        error: err
      }))
  }

  refresh() {
    this.loadMessages()
    this.loadStats()
  }

  componentWillMount() {
    this.refresh()
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
              onClick={() => this.refresh()}
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