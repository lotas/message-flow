import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader,  Segment, Container, Button, Rail } from 'semantic-ui-react'

import MessageList from '../components/MessageList';
import Stats from '../components/Stats';
import {getMessages, getStats} from '../api';


import { loadMessages, loadNextPage } from '../redux/modules/messages';

class Messages extends Component {

  componentWillMount() {
    this.props.loadMessages();
  }

  render() {
    const {messages, loading} = this.props;

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
            <Stats {...this.props.stats} />
          </Container>


          { messages.length > 0 && <MessageList messages={messages} /> }

          { messages.length > 0 &&
          <Segment textAlign='center'>
            <Button
              content='Load more'
              icon='arrow down'
              color='blue'
              basic
              onClick={() => this.props.loadNextPage()}
             />
          </Segment>
        }
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.messages.loading,
  messages: state.messages.messages,
  stats: state.stats
});

const mapDispatchToProps = (dispatch) => ({
  loadMessages: () => dispatch(loadMessages()),
  loadNextPage: () => dispatch(loadNextPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);