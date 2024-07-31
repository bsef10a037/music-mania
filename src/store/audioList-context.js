import React, { useState } from 'react';

const AudioListContext = React.createContext({ 
});
export default AudioListContext;

export const AudioListContextProvider = (props) => {
	
	const [audioListState, setAudioListState] = useState([]);
	const [searchedSongs, setSearchedSongs] = useState([]);
	const [playlist, setPlaylist] = useState([]);
	
	const audioList = {
    audioList: audioListState,
    searchedSongs: searchedSongs,
    playlist: playlist,
    onPlaylistUpdate: (val) => {
    	if (typeof val.length === 'undefined') {
	      setPlaylist(prevState => {
      		return [val, ...prevState]
	      });
    	} else {
    		setPlaylist(val);
    	}
    },
    onAddSongInPlaylist(playlistkey, songData) {
    	const playlistObj = playlist.filter((p) => p.key === playlistkey);
    	const songExists = playlistObj[0].songs.filter((s) => s.key ===songData.key);
    	if (songExists.length < 1)
    		playlistObj[0].songs.push(songData);
    	var result = playlist.concat(playlistObj).filter(function(o) {  
	      return this[o.key] ? false : this[o.key] = true;
	    }, {});
	    setPlaylist(result);
    },
    onAudioListUpdate: (val) => {
      setAudioListState(val);
    },
    onAudioListAdd: (val) => {
    	const alreadyAdded = audioListState.filter((audioList) => audioList.songId === val.songId);
    	// console.log(alreadyAdded);
      if (alreadyAdded.length === 0) {
	      setAudioListState(prevState => {
	      	return [val, ...prevState]
	      });
      }
    },
    onAudioListRemove: (id) => {
    	const newAudioList = audioListState.filter((audioList) => audioList.songId !== id);
      setAudioListState(newAudioList);
    },
    onSearchedSongsUpdate: (val) => {
      setSearchedSongs(val);
    }
	}

	return(
		<AudioListContext.Provider value={audioList}>
			{props.children}
		</AudioListContext.Provider>
	)
}