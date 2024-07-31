import React, { useState, useEffect } from 'react';

function ListenPlaylist(props)	{
  const [playListState, setplayListState] = useState('');
  const toggleState = () => {
    setplayListState(playListState === 'active' ? '' : 'active');
  }

  useEffect(()=> {
    if (playListState === 'active') {
      props.onAdd(props.songData.key, 
          props.songData.singerName, props.songData.songName, props.songData.imageName,
           props.songData.songSrc)
    } else {
      props.onRemove(props.songData.key);
    }
  },[playListState])

	return (
		<li className="list-group-item">
      <div className="pull-right m-l">
        <span className="m-r-sm pointer"><i className="icon-cloud-download"></i></span>
        <span className="m-r-sm pointer" onClick={toggleState}>
          {playListState === 'active' && <i className="fa fa-minus-circle"></i>}
          {playListState === '' && <i className="icon-plus"></i>}
        </span>
      </div>
      <span className="jp-play-me m-r-sm pull-left pointer">
        <i className="icon-control-play text"></i>
        <i className="icon-control-pause text-active"></i>
      </span>
      <div className="clear text-ellipsis">
        <span>{props.songData.songName}</span>
        <span className="text-muted"> -- {props.songData.songDuration ? props.songData.songDuration: ''}</span>
      </div>
    </li>
	)
}

export default ListenPlaylist;