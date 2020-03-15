import React, { Component } from 'react'
import styled from 'styled-components'
import { ScaleLoader } from 'react-spinners'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as blogActions from 'redux/modules/blog'

import PostSelector from 'components/PostSelector'
import Button from 'components/Button'

const BlogFlexContainer = styled.div`
	display: flex
	margin-bottom: 75px
	flex-direction: column
`
const PostsContainer = styled.div`
	flex-basis: 70vh;
`
const Pagination = styled.div`
	display: flex
	flex: 1
	width: 100%
	height: auto
	border-radius: 5px
	margin-bottom: 25px
	justify-content: space-between
`
const Loader = styled.div`
	display: flex
	padding-top: 5vh
	padding-bottom: 90vh
	justify-content: center
`

class Blog extends Component {

	loadPosts = async () => {
		const { BlogActions, match } = this.props

		if (match.path === '/') {
			await BlogActions.getPosts(1)
		}

		if (match.params.id) {
			await BlogActions.getPosts(match.params.id)
		}
	}

	componentWillMount() {
		this.loadPosts()
	}

	back = async () => {
		const { BlogActions, blog, history } = this.props
		const { current } = blog

		try {
			if (current !== 1) {
				const nextPage = current - 1
				history.push(`/${nextPage}`)
				await BlogActions.getPosts(nextPage)
			}
		} catch (e) {
			console.log(e)
		}
	}

	next = async () => {
		const { BlogActions, blog, history } = this.props
		const { current, pages } = blog

		try {
			if ((current + 1) <= pages) {
				const nextPage = current + 1
				history.push(`/${nextPage}`)
				await BlogActions.getPosts(nextPage)
			}
		} catch (e) {
			console.log(e)
		}
	}
	
	renderPosts(posts) {
		return posts.map(post => <PostSelector key={post._id} post={post} />)
	}

	render() {
		const { loading, error } = this.props
		const { posts } = this.props.blog

		return (
			<BlogFlexContainer>

				<PostsContainer>
					{error && <h1>Something went wrong. contact ben@electrictooth.io</h1>}

					{loading
						? <Loader><ScaleLoader color={'#EFBDEB'} /></Loader>
						: this.renderPosts(posts)
					}
				</PostsContainer>


				<Pagination>
					<Button onClick={this.back}>back</Button>
					<Button onClick={this.next}>next</Button>
				</Pagination>

			</BlogFlexContainer>
		)
	}
}

export default connect(
	state => ({
		blog: state.blog,
		updatedAt: state.blog.updatedAt,
		loading: state.pender.pending['blog/GET_BLOG_POSTS'],
		error: state.pender.failure['blog/GET_BLOG_POSTS']
	}),
	dispatch => ({
		BlogActions: bindActionCreators(blogActions, dispatch)
	})
)(Blog)