// those are ENV variables coming from .env file

const config = {
  slackAuthLink: process.env.REACT_APP_SLACK_AUTH_LINK,
  apiUrl: process.env.REACT_APP_API_URL
};

export default config;