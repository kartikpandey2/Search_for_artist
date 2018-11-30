import React, { Component } from 'react'
import { Card } from 'antd';

export default class ArtistDisplay extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log(this.props.data)
		const artistCard = this.props.data.map((data) => (
				<Card
				  cover={<img alt="example" src={data.artworkUrl100} />}
			    style={{ width: 300 }}
			  >
			    <p>{data.artistName}</p>
			    <p>{data.collectionName}</p>
			  </Card>
		))
		return artistCard
	}
}