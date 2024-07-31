import React, { useContext, useEffect, useState } from 'react';
import useData from '../../hooks/useData';
import Modal from '../UI/Modal';
import AudioListContext from '../../store/audioList-context';
import Song from '../music/Song';

function Genres(props)	{
	const ctxAudio = useContext(AudioListContext);
	const [songs, setSongs]= useState([]);
	const [playSong, setPlaySong]= useState({});
	const [activePage, setActivePage]= useState(1);
	const [filterText, setFilterText]= useState('All');

	const getFilteredSongs = (filter) => {
		setFilterText(filter.target.innerHTML.trim());
		// setSongs(prevState => prevState.filter((song) => song.genre === filterText));
	}
	

	const applySongs = (data) => {
    if (ctxAudio.searchedSongs.length !== 0) {
      setSongs(ctxAudio.searchedSongs.slice(0,2));
    } else {
    	if (filterText !== 'All') {
				const filtered = data.filter((song) => song.genre === filterText);
	      setSongs(filtered);
    	} else {
    		setSongs(data);
    	}
    }
  }

  /* In realtime range will be passed in getAllSongs function for pagination
			activePage State will create range i-e
			initial (0,5)
			for 2nd page
			(0+1*5, 5*2)
			for 3nd page
			(0+2*5, 5*3)
			getPageHandler will call getAllSongs with this range while allSongs variable will not use
			slice the results anymore
			In this senario all songs are get from file and we manupulate pagination with slicing result array
  */

  const getPageHandler = (e) => {
  	if (e === 'left') {
  		if (activePage > 1)
  			setActivePage(prevState => prevState-1);
  	} if (e === 'right') {
  		if (activePage < Math.ceil(songs.length/5))
  			setActivePage(prevState => prevState+1);
  	} else if(e !== 'left' && e !== 'right') {
  		setActivePage(parseInt(e.target.innerText.trim()));
  	}
  }
  
	const getAllSongs = () => {
		getSongs('songsData.json',{
      method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }, applySongs);
	}
	const playSongHandler = (songId, songSt, singer, song, songCover, songSrc) => {
    if (playSong.hasOwnProperty('songId')) {
      if (playSong.songId === songId){
        if (songSt === 'active' ){
          setPlaySong({'songId': songId, 'state': ''});
          ctxAudio.onAudioListUpdate([]);
        } else {
          setPlaySong({'songId': songId, 'state': 'active'});
          ctxAudio.onAudioListUpdate([{
            songId: songId,
            name: song,
            singer: singer,
            cover: ["images", songCover].join("/"),
            musicSrc: songSrc
          }]);
        }
      } else {
        setPlaySong({'songId': songId, 'state': 'active'});
        ctxAudio.onAudioListUpdate([{
          songId: songId,
          name: song,
          singer: singer,
          cover: ["images", songCover].join("/"),
          musicSrc: songSrc
        }]);
      }
    } else {
      setPlaySong({'songId': songId, 'state': 'active'});
      ctxAudio.onAudioListUpdate([{
        songId: songId,
        name: song,
        singer: singer,
        cover: ["images", songCover].join("/"),
        musicSrc: songSrc
      }]);
    }
  }

  const addPlaylistHandler = (songId, singer, song, songCover, songSrc) => {
    ctxAudio.onAudioListAdd({
      songId: songId,
      name: song,
      singer: singer,
      cover: ["images", songCover].join("/"),
      musicSrc: songSrc
    })
  }

  const removePlaylistHandler = (songId) => {
    ctxAudio.onAudioListRemove(songId);
  }
	
	useEffect(() => {
    getAllSongs();
  },[ctxAudio.searchedSongs,filterText]);

	const { fetchDataHandler: getSongs, loading: songLoading} = useData();
	let allSongs = 
    songs.slice((activePage*5)-5,activePage*5).map((song, index) => (
      <div key={index} className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
        <Song key={index} songData={song} onPlaySong={playSongHandler} isPlaying={playSong} onAdd={addPlaylistHandler} onRemove={removePlaylistHandler}/>        
      </div>    
    ))
  let paginationCount = Math.ceil(songs.length/5);
  let lis = [];
  for (var i=1; i <= paginationCount; i++) {
    lis.push(<li className={`${activePage == i ? 'active' : ''}`} key={i}><span key={i} className="pointer" onClick={(e) => {getPageHandler(e)}}>{i}</span></li>)
  }
	return (
    <section id="content">
    	{songLoading && <Modal>Loading Songs</Modal>}
    	<section className="vbox">
      	<section className="w-f-md" id="bjax-target">
	        <section className="hbox stretch">
	          <aside className="aside bg-light dk" id="sidebar">
	            <section className="vbox animated fadeInUp">
	              <section className="scrollable hover">
	                <div className="list-group no-radius no-border no-bg m-t-n-xxs m-b-none auto">
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    All
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item active">
	                    acoustic
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    ambient
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    blues
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    classical
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    country
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    electronic
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    emo
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    folk
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    hardcore
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    hip hop
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    indie
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    jazz
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    latin
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    metal
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    pop
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    pop punk
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    punk
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    reggae
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    rnb
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    rock
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    soul
	                  </span>
	                  <span onClick={(e) => getFilteredSongs(e)} className="pointer list-group-item">
	                    world
	                  </span>
	                </div>
	              </section>
	            </section>
	          </aside>
	          <section>
	            <section className="vbox">
	              <section className="scrollable padder-lg">
	                <h2 className="font-thin m-b">Acoustic</h2>
	                <div className="row row-sm">
	                  {allSongs}
	                </div>
	                <ul className="pagination pagination">
	                  <li><span className="pointer" onClick={() => {getPageHandler("left")}}><i className="fa fa-chevron-left"></i></span></li>
	                  {lis}
	                  <li><span className="pointer" onClick={() => {getPageHandler("right")}}><i className="fa fa-chevron-right"></i></span></li>
	                </ul>
	              </section>                    
	            </section>
	          </section>
	        </section>
      	</section>
    	</section>
  	</section>
	)
}

export default Genres;