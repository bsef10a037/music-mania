import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import CreateOrAddPlaylist from './CreateOrAddPlaylist';

function Song(props) {
	var starHtml = [];
	var [stars, setStars] = useState(props.songData.stars ? props.songData.stars : 5); 
	for (var i = 1; i <= 5; i++) {
	  starHtml.push(i <= stars ? 
  	 <i number={i} onClick={(e) => ratingHandler(e)} style={{cursor: "pointer"}} className="fa fa-star"></i>:
  	 <i number={i} onClick={(e) => ratingHandler(e)} style={{cursor: "pointer"}} className="fa fa-star-o text-muted"></i>);
	}
	
	const [songState, setSongState] = useState({
		"added": props.songData.isAddedActive,
	  "like": props.songData.isLikeActive,
	  "closed": false
	});

	const toggleState = (e) => {
		if (e === 'like') {
			setSongState(prevState => {
				return {...prevState, "like": songState.like === 'active' ? '' : 'active'}
			})
		}
		if (e === 'added') {
			setSongState(prevState => {
				return {...prevState, "added": songState.added === 'active' ? '' : 'active'}
			})
		}
		if (e === 'closed') {
			setSongState(prevState => {
				return {...prevState, "closed": !prevState.closed}
			})
		}
	}

	useEffect(()=> {
		if (songState.added === 'active') {
			toggleState("closed");
			// props.onAdd(props.songData.key, 
   //    		props.songData.singerName, props.songData.songName, props.songData.imageName,
   //    		 props.songData.songSrc)
		} else {
			props.onRemove(props.songData.key);
		}
	},[songState.added])

	const ratingHandler = (e) => {
		setStars(e.target.getAttribute('number'));
	}
	
	return (
		<div className="item">
			{songState.closed && <Modal onClose={() => toggleState("closed")}><CreateOrAddPlaylist onClose={toggleState} songData={props.songData}/></Modal>}
      <div className="pos-rlt">
      	{!props.songData.isPlaylist && 
	      	<div className="bottom">
	          <span className="badge bg-info m-l-sm m-b-sm">{props.songData.SongDuration}</span>
	        </div>
      	}
        <div className ={`item-overlay opacity r r-2x bg-black ${props.songData.isStarActive}`}>
          <div className="text-info padder m-t-sm text-sm" style={{cursor: "pointer"}}>
            {starHtml}
          </div>
          <div className="center text-center m-t-n">
            <span style={{cursor: "pointer"}} onClick={() => props.onPlaySong(props.songData.key, props.isPlaying.state, props.songData.singerName, props.songData.songName, props.songData.imageName, props.songData.songSrc)} data-toggle="class" className={`${props.isPlaying.songId === props.songData.key ? props.isPlaying.state : ''}`}>
              <i className="icon-control-play i-2x text"></i>
              <i className="icon-control-pause i-2x text-active"></i>
            </span>
          </div>
          <div className="bottom padder m-b-sm">
            <span style={{cursor: "pointer"}} onClick={() => toggleState("like")} className={`pull-right ${songState.like}`} data-toggle="class">
              <i className="fa fa-heart-o text"></i>
              <i className="fa fa-heart text-active text-danger"></i>
            </span>
            <span style={{cursor: "pointer"}} onClick={() => toggleState("added")} data-toggle="class" className={`${songState.added}`}>
              <i className="fa fa-plus-circle text"></i>
              <i className="fa fa-check-circle text-active text-info"></i>
            </span>
          </div>
        </div>
        {props.songData.bookMark &&
	        <div className="top">
	        	<span className="pull-right m-t-sm m-r-sm badge bg-white">12</span>
	        	<span className="pull-right m-t-n-xs m-r-sm text-white">
	        		<i className="fa fa-bookmark i-lg"></i>
	        	</span>
	      	</div>
      	}
        <a href="#"><img src={'images/'+ props.songData.imageName} alt="" className="r r-2x img-full" /></a>
      </div>
      <div className="padder-v">
        <a href="#" className="text-ellipsis">{props.songData.songName}</a>
        <a href="#" className="text-ellipsis text-xs text-muted">{props.songData.singerName}</a>
      </div>
    </div>
	)
}

export default Song;
