import React from 'react';

function TopSong(props)	{
	return (
		<span style={{cursor:"pointer"}} className="list-group-item clearfix" onClick={() => props.onPlaySong(props.songData.key, props.isPlaying.state, props.songData.singerName, props.songData.songName, props.songData.imageName, props.songData.songSrc)}>
      <span className="pull-right h2 text-muted m-l">{props.number}</span>
      <span className="pull-left thumb-sm avatar m-r">
        <img src={`images/${props.songData.imageName}`} alt="..." />
      </span>
      <span className="clear">
        <span>{props.songData.songName}</span>
        <small className="text-muted clear text-ellipsis">by {props.songData.songName}</small>
      </span>
    </span>
	)
}

export default TopSong;