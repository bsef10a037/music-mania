import React, { useRef, useContext } from 'react';
import Input from '../UI/Input';
import AudioListContext from '../../store/audioList-context';

function AddPlaylist(props)	{
	const inputRef = useRef(null);
	const ctxPlaylist = useContext(AudioListContext);
	
	const createPlaylistHandler = (e) => {
		e.preventDefault();
		var newPlaylist = {
		"playlistName": inputRef.current.value,
		"key": Math.random(),
		"stars": "2",
		"isPlaylist": true,
		"SongDuration": "05:20",
		"bookMark": true,
		"isAddedActive": "",
		"isLikeActive": "",
		"isStarsActive": "active",
		"playlistImage": "p1.jpg",
		"songs": []
	};
		ctxPlaylist.onPlaylistUpdate(newPlaylist);
    props.onClose();
	}

	return (
		<section>
			<form>
				<Input ref={inputRef} input={{"type":"text", "placeholder":"",
	      	"className": "form-control rounded input-lg text-center"}}/>
				<button onClick={createPlaylistHandler} className="btn btn-primary">Create Playlist</button>
			</form>
		</section>
	)
}

export default AddPlaylist;