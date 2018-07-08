import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import PostList from './components/PostList';
import AddPost from './components/AddPost';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/api/v-1/'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1> Chat </h1>
                <PostList />
                <AddPost />
            </div>
        </ApolloProvider>
    );
  }
}

export default App;
