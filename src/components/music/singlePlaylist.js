import React, { useState, useEffect } from 'react';

function SinglePlaylist(props) {
	var starHtml = [];
	var [stars, setStars] = useState(props.songData.stars ? props.songData.stars : 5); 
	for (var i = 1; i <= 5; i++) {
	  starHtml.push(i <= stars ? 
  	 <i number={i} onClick={(e) => ratingHandler(e)} style={{cursor: "pointer"}} className="fa fa-star"></i>:
  	 <i number={i} onClick={(e) => ratingHandler(e)} style={{cursor: "pointer"}} className="fa fa-star-o text-muted"></i>);
	}
	
	const [songState, setSongState] = useState({
	  "like": props.songData.isLikeActive
	});

	const toggleState = (e) => {
		if (e === 'like') {
			setSongState(prevState => {
				return {...prevState, "like": songState.like === 'active' ? '' : 'active'}
			})
		}
	}

	const ratingHandler = (e) => {
		setStars(e.target.getAttribute('number'));
	}
	
	return (
		<div className="item">
      <div className="pos-rlt">
        <div style={{"zIndex":"1"}} className ={`item-overlay opacity r r-2x bg-black ${props.songData.isStarActive}`}>
          <div className="text-info padder m-t-sm text-sm" style={{cursor: "pointer"}}>
            {starHtml}
          </div>
          <div className="center text-center m-t-n">
            <span style={{cursor: "pointer"}} onClick={() => props.onPlaySong(props.songData.key, props.isPlaying.state, props.songData.songs)} data-toggle="class" className={`${props.isPlaying.playlistId === props.songData.key ? props.isPlaying.state : ''}`}>
              <i className="icon-control-play i-2x text"></i>
              <i className="icon-control-pause i-2x text-active"></i>
            </span>
          </div>
          <div className="bottom padder m-b-sm">
            <span style={{cursor: "pointer"}} onClick={() => toggleState("like")} className={`pull-right ${songState.like}`} data-toggle="class">
              <i className="fa fa-heart-o text"></i>
              <i className="fa fa-heart text-active text-danger"></i>
            </span>
          </div>
        </div>
        <div className="top">
        	<span className="pull-right m-t-sm m-r-sm badge bg-white">{props.songData.songs ? props.songData.songs.length : 0}</span>
      		{props.songData.bookMark &&
        		<span className="pull-right m-t-n-xs m-r-sm text-white">
        		<i className="fa fa-bookmark i-lg"></i>
        	</span>
    			}
      	</div>
        <a href="#"><img src={'images/'+ props.songData.playlistImage} alt="" className="r r-2x img-full" /></a>
      </div>
      <div className="padder-v">
        <a href="#" className="text-ellipsis">{props.songData.playlistName}</a>
      </div>
    </div>
	)
}

export default SinglePlaylist;
