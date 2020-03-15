import React from 'react'
import styled from 'styled-components'
import Classic from 'components/Classic'
import Soundcloud from 'components/Soundcloud'
import Youtube from 'components/Youtube'

const PostContainer = styled.article`
		display: flex
		flex-direction: column
		padding: 15px 15px 25px 15px
`

const PostSelector = ({ post }) => {
	return (
		<PostContainer>
			{/* SOUNDCLOUD */}
			{post.sc_id && <Soundcloud {...post} />}

			{/* YOUTUBE */}
			{post.yt_id && <Youtube {...post} />}

			{/* CLASSIC */}
			{post.et_stream && <Classic {...post} />}
		</PostContainer>
	)
}

export default PostSelector