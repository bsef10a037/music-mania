import React from 'react';

function NewSong(props)	{
	return (
		<div className="item">
      <div className="pos-rlt">
        <div className="item-overlay opacity r r-2x bg-black">
          <div className="center text-center m-t-n">
            <span onClick={() => props.onPlaySong(props.songData.key, props.isPlaying.state, props.songData.singerName, props.songData.songName, props.songData.imageName, props.songData.songSrc)} style={{cursor:"pointer"}}>
              
              <i className={`${props.isPlaying.songId === props.songData.key ? 'fa fa-pause' : 'fa fa-play-circle'} i-2x`} ></i>
            </span>
          </div>
        </div>
        <a><img src={`images/${props.songData.imageName}`} alt="" className="r r-2x img-full" /></a>
      </div>
      <div className="padder-v">
        <a href="#" className="text-ellipsis">{props.songData.songName}</a>
        <a href="#" className="text-ellipsis text-xs text-muted">{props.songData.songName}</a>
      </div>
    </div>
	)
}

export default NewSong;