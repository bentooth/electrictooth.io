import React, { Component } from 'react';
import styled from 'styled-components';
import PostSelector from 'components/PostSelector';
import Button from 'components/Button';
import posts from 'data.json';

const BlogFlexContainer = styled.div`
	display: flex
	margin-bottom: 75px
	flex-direction: column
`;
const PostsContainer = styled.div`
  flex-basis: 70vh;
`;

class Blog extends Component {
  state = {
    posts: [],
    current: 5,
    loading: false,
  };

  componentWillMount() {
    this.setState({ loading: true });

    let myPosts = posts.posts.reverse();
    let currentPosts = myPosts.slice(0, this.state.current);

    this.setState({ posts: currentPosts, loading: false });
  }

  loadMore = () => {
    let myPosts = posts.posts.reverse();
    let currentPosts = myPosts.slice(
      this.state.current,
      this.state.current + 5,
    );

    this.setState({
      posts: [...this.state.posts, ...currentPosts],
      loading: false,
    });
  };

  renderPosts(posts) {
    return posts.map((post) => <PostSelector key={post._id} post={post} />);
  }

  render() {
    console.log(this.state);
    return (
      <BlogFlexContainer>
        <PostsContainer>
          {this.state.loading ? 'loading' : this.renderPosts(this.state.posts)}
        </PostsContainer>

        <Button onClick={this.loadMore} style={{ width: '100%' }}>
          Load more
        </Button>
      </BlogFlexContainer>
    );
  }
}

export default Blog;
