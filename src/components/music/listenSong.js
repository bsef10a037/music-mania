import React from 'react';

function ListenSong(props)	{
	return (
		<li className="list-group-item clearfix">
      <span className=" pointer jp-play-me pull-right m-t-sm m-l text-md" 
      	onClick={() => props.onPlaySong(props.songData.key, props.isPlaying.state, 
      		props.songData.singerName, props.songData.songName, props.songData.imageName,
      		 props.songData.songSrc)}>
        <i className={`icon-control-play ${props.isPlaying.songId === props.songData.key ? 'text-active' : 'text'}`}></i>
        <i className={`icon-control-pause ${props.isPlaying.songId === props.songData.key ? 'text' : 'text-active'}`}></i>
      </span>
      <span className="pointer pull-left thumb-sm m-r">
        <img src="images/m0.jpg" alt="..." />
      </span>
      <span className="clear pointer" >
        <span className="block text-ellipsis">{props.songData.songName}</span>
        <small className="text-muted">by {props.songData.singerName}</small>
      </span>
    </li>
	)
}

export default ListenSong;