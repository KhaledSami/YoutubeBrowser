import _ from 'lodash';
import ReactDom from 'react-dom';
import React, { Component } from 'react';
import YTsearch from 'youtube-api-search';
import SearchBar from './components/search-bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyD9Jpxe-vY0Q4ZXfvPeZnxswrLtbEYiolQ';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('surfborads');

	}
	videoSearch(term) {
		YTsearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}
	render() {
		const videoSearchDebounce = _.debounce((term) => {
			this.videoSearch(term)}, 300);
		return (
			<div>
				<SearchBar onSearchTermChange={videoSearchDebounce}/>
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList
				onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
				videos={this.state.videos}/>
			</div>
		);	
	}
}


ReactDom.render(<App/>, document.querySelector('.container'));