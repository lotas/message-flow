import React, { Component } from 'react';
import { Card, Item, Feed } from 'semantic-ui-react';

import './styles.css';

const CardMessage = (props) => (
  <Card>
    <Card.Content header={props.message.username} />
    <Card.Content description={props.message.text} />
    <Card.Content extra>
      { new Date(props.message.ts).toLocaleString() }
    </Card.Content>
  </Card>
);

const extractIcon = (msg) => {
  if (msg.meta && msg.meta.icons) {
    return Object.values(msg.meta.icons).pop();
  }
  return null;
}

const formatMessageDate = (msg) => new Date(msg.event_time * 1000).toLocaleString();
const formatMessageText = (msg) => {
  let txt = msg.text;
  if (!txt && msg.attachments && msg.attachments.length) {
    const att = msg.attachments[0];
    txt = att.text || att.fallback;
  }
  if (!txt) {
    console.debug('Odd message:', msg);
    return '';
  }

  return String(txt).replace(/<([^>]+)>/g, (match, p1) => {
    const [url, linkName] = p1.split('|');
    return `<a href="${url}">${linkName || url}</a>`;
  });
}

const ItemMessage = (props) => (
  <Item key={props.msg._id}>
    <Item.Image size='tiny' src={extractIcon(props.msg)} />
    <Item.Content>
      <Item.Header>{props.msg.username}</Item.Header>
      <Item.Meta>
        <span className='channel'>{props.msg.channel}</span>
        <span className='team'>{props.msg.channel}</span>
      </Item.Meta>
      <Item.Description>{props.msg.text}</Item.Description>
    </Item.Content>
  </Item>
);

const FeedMessage = (props) => (
  <Feed.Event key={props.msg._id}>
    <Feed.Label image={extractIcon(props.msg)} />
    <Feed.Content>
      <Feed.Summary>
        <Feed.User>{props.msg.username}</Feed.User>
        {" posted on "}
        <Feed.Date>{formatMessageDate(props.msg)}</Feed.Date>
      </Feed.Summary>
      <Feed.Extra text className="feed-longText">
        <span dangerouslySetInnerHTML={{__html: formatMessageText(props.msg)}} />
      </Feed.Extra>
    </Feed.Content>
  </Feed.Event>
);


const MessageItemList = (props) => (
  <Item.Group>
    { props.messages.map(msg => <ItemMessage msg={msg} />) }
  </Item.Group>
);

const MessageList = (props) => (
  <Feed>
    { props.messages.map(msg => <FeedMessage msg={msg} />) }
  </Feed>
);


export default MessageList;