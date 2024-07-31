import React, { useContext, useRef, useEffect, useState } from 'react';
import Input from '../UI/Input';
import AudioListContext from '../../store/audioList-context';
import useData from '../../hooks/useData';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';

let playlistCount = 1;
function CreateOrAddPlaylist(props)	{
	const [options, setOptions] = useState([]);
	const [selected, setSelected] = useState('');
	const [currPlaylistStatus, setCurrPlaylistStatus] = useState("new");
	const inputRef = useRef(null);
	const ctxPlaylist = useContext(AudioListContext);

	const AddToPlaylistHandler = (e) => {
		e.preventDefault();
		let songObj = {
			"key": props.songData.key,
			"name": props.songData.songName,
			"singer": props.songData.singerName,
			"cover": props.songData.imageName,
			"musicSrc": props.songData.songSrc
		};
		ctxPlaylist.onAddSongInPlaylist(selected.value, songObj);
		// ctxPlaylist.onAudioListAdd({
  //     songId: props.songData.key,
  //     name: props.songData.songName,
  //     singer: props.songData.singerName,
  //     cover: ["images", props.songData.imageName].join("/"),
  //     musicSrc: props.songData.songSrc
  //   });
   	setCurrPlaylistStatus("gotoplaylist");
		// props.onClose("closed");
	}
	
	
	const createPlaylistHandler = () => {

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
		"songs": [
			{
				"key": props.songData.key,
				"name": props.songData.songName,
				"singer": props.songData.singerName,
				"cover": props.songData.imageName,
				"musicSrc": props.songData.songSrc
			},
		]
	};
		 ctxPlaylist.onPlaylistUpdate(newPlaylist);
		 // ctxPlaylist.onAudioListAdd({
   //    songId: props.songData.key,
   //    name: props.songData.songName,
   //    singer: props.songData.singerName,
   //    cover: ["images", props.songData.imageName].join("/"),
   //    musicSrc: props.songData.songSrc
   //  });
   	setCurrPlaylistStatus("gotoplaylist")
    // props.onClose("closed");
	}

	const applyPlaylists = async(data) => {
    let ctx = ctxPlaylist.playlist;
    let currData = data;
    var result = ctx.concat(currData).filter(function(o) {  
      return this[o.key] ? false : this[o.key] = true;
    }, {});
    ctxPlaylist.onPlaylistUpdate(result);
  }

	const getAllPlaylists = () => {
    getPlaylists('playlist1.json',{
      method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }, applyPlaylists);
  }

  const getAllPlaylistsAndSongs = () => {
  	let someArr = [];
    ctxPlaylist.playlist.map(eachPlaylist => {
			let obj = new Object();
			obj["value"] = eachPlaylist.key;
			obj["label"] = eachPlaylist.playlistName;
			someArr.push(obj);
		})
		setOptions(someArr);
  }
	
	useEffect (() => {
		if (inputRef.current !== null) {
			inputRef.current.focus();
		} else {
			getAllPlaylists();
		} 
	}, [currPlaylistStatus])

	useEffect(() => {
    getAllPlaylistsAndSongs();
  },[ctxPlaylist.playlist]);

  const {fetchDataHandler: getPlaylists} = useData();

	return (
		<section>
			{currPlaylistStatus === 'new' && 
				<section>
					<span onClick={() => {setCurrPlaylistStatus("new")}} className="pointer">Create Playlist</span>
					<span onClick={() => {setCurrPlaylistStatus("add")}} className="pointer pull-right">Add to Playlist</span>
					<form>
						<Input ref={inputRef} input={{"type":"text", "placeholder":"",
			      	"className": "form-control rounded input-lg text-center"}}/>
						<button onClick={createPlaylistHandler} className="btn btn-primary">Create Playlist</button>
					</form>
				</section>
			}
			{currPlaylistStatus === 'add' && 
				<section>
					<span onClick={() => {setCurrPlaylistStatus("new")}} className="pointer">Create Playlist</span>
					<span onClick={() => {setCurrPlaylistStatus("add")}} className="pointer pull-right">Add to Playlist</span>
					<form>
			      <Select
			      	defaultValue={selected}
			        options={options}
			        onChange={setSelected}
			      />
						<button onClick={AddToPlaylistHandler} className="btn btn-primary">Add to Playlist</button>
					</form>
				</section>
			}
			{currPlaylistStatus === 'gotoplaylist' && 
				<section>
					<NavLink to="/playlist" className="btn btn-warning">Go to Playlist</NavLink>
				</section>
			}
		</section>
	)
}

export default CreateOrAddPlaylist;