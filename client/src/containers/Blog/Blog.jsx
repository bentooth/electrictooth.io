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
    allPosts: [],
    current: 5,
  };

  componentWillMount() {
    let allPosts = posts.posts;
    let currentPosts = allPosts.slice(0, this.state.current);

    this.setState({
      posts: currentPosts,
      allPosts: allPosts,
      total: allPosts.length,
      loading: false,
    });
  }

  loadMore = () => {
    if (this.state.current < this.state.total) {
      let prev = this.state.current;
      let next = this.state.current + 5;

      let currentPosts = this.state.allPosts.slice(prev, next);

      this.setState({
        posts: [...this.state.posts, ...currentPosts],
        current: next,
        loading: false,
      });
    }
  };

  renderPosts(posts) {
    return posts.map((post) => <PostSelector key={post._id} post={post} />);
  }

  render() {
    console.log(this.state);
    return (
      <BlogFlexContainer>
        <PostsContainer>{this.renderPosts(this.state.posts)}</PostsContainer>

        <Button onClick={this.loadMore} style={{ width: '100%' }}>
          Load more
        </Button>
      </BlogFlexContainer>
    );
  }
}

export default Blog;
