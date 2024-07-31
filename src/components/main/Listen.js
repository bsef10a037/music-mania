import React, { useState, useEffect, useContext } from 'react';
import  AudioListContext  from "../../store/audioList-context";
import ListenSong from '../music/listenSong';
import ListenPlaylist from '../music/listenPlaylist';
import useData from '../../hooks/useData';

function Listen(props)	{
	const ctxAudio =  useContext(AudioListContext);
	const [songs, setSongs]= useState([]);
  const [playSong, setPlaySong]= useState({});
  const {fetchDataHandler: getSongs}= useData();
  
  const applySongs = (data) => {
    setSongs(data);
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
    if (playSong.hasOwnProperty('songId')){
      if (playSong.songId === songId){
        if (songSt === 'active' ){
          setPlaySong({'songId': songId, 'state': ''});
          ctxAudio.onAudioListUpdate([]);
        }
        else {
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
    return () => {
    	setSongs([]);
    	setPlaySong({});
    }
  },[]);

  let playableSongs = 
    songs.slice(11,16).map((song, index) => (
      <ul className="list-group list-group-lg no-bg auto m-b-none m-t-n-xxs">
        <ListenSong key={index} songData={song} onPlaySong={playSongHandler} isPlaying={playSong}/>        
      </ul>    
    ))

  let allPlayLists = 
    songs.slice(0,5).map((song, index) => (
      <ul className="list-group list-group-lg no-radius no-border no-bg m-t-n-xxs m-b-none auto">
        <ListenPlaylist key={index} songData={song} onAdd={addPlaylistHandler} onRemove={removePlaylistHandler}/>        
      </ul>    
    ))

	return (
	  <section className="w-f-md">
	    <section className="hbox stretch bg-black dker">
	      <aside className="col-sm-5 no-padder" id="sidebar">
	        <section className="vbox animated fadeInUp">
	          <section className="scrollable">
	            <div className="m-t-n-xxs item pos-rlt">
	              <div className="top text-right">
	                <span className="musicbar animate bg-success bg-empty inline m-r-lg m-t" style={{width:"25px", height:"30px"}}>
	                  <span className="bar1 a3 lter"></span>
	                  <span className="bar2 a5 lt"></span>
	                  <span className="bar3 a1 bg"></span>
	                  <span className="bar4 a4 dk"></span>
	                  <span className="bar5 a2 dker"></span>
	                </span>
	              </div>
	              <div className="bottom gd bg-info wrapper-lg">
	                <span className="pull-right text-sm">101,400 <br/>Followers</span>
	                <span className="h2 font-thin">Soph Ashe</span>
	              </div>
	              <img className="img-full" src="images/m43.jpg" alt="..." />
	            </div>
	            {allPlayLists}
	          </section>
	        </section>
	      </aside>
	      <section className="col-sm-4 no-padder bg">
	        <section className="vbox">
	          <section className="scrollable hover">
	            {playableSongs}
	          </section>
	        </section>
	      </section>
	      <section className="col-sm-3 no-padder lt">
	        <section className="vbox">
	          <section className="scrollable hover">
	            <div className="m-t-n-xxs">
	              <div className="item pos-rlt">
	                <a href="#" className="item-overlay active opacity wrapper-md font-xs">
	                  <span className="block h3 font-bold text-info">Find</span>
	                  <span className="text-muted">Search the music you like</span>
	                  <span className="bottom wrapper-md block">- <i className="icon-arrow-right i-lg pull-right"></i></span>
	                </a>
	                <a href="#">
	                  <img className="img-full" src="images/m40.jpg" alt="..." />
	                </a>
	              </div>
	              <div className="item pos-rlt">
	                <a href="#" className="item-overlay active opacity wrapper-md font-xs text-right">
	                  <span className="block h3 font-bold text-warning text-u-c">Listen</span>
	                  <span className="text-muted">Find the peace in your heart</span>
	                  <span className="bottom wrapper-md block"><i className="icon-arrow-right i-lg pull-left"></i> -</span>
	                </a>
	                <a href="#">
	                  <img className="img-full" src="images/m41.jpg" alt="..." />
	                </a>
	              </div>
	              <div className="item pos-rlt">
	                <a href="#" className="item-overlay active opacity wrapper-md font-xs">
	                  <span className="block h3 font-bold text-success text-u-c">Share</span>
	                  <span className="text-muted">Share the good songs with your loves</span>
	                  <span className="bottom wrapper-md block">- <i className="icon-arrow-right i-lg pull-right"></i></span>
	                </a>
	                <a href="#">
	                  <img className="img-full" src="images/m42.jpg" alt="..." />
	                </a>
	              </div>
	              <div className="item pos-rlt">
	                <a href="#" className="item-overlay active opacity wrapper-md font-xs text-right">
	                  <span className="block h3 font-bold text-white text-u-c">2014</span>
	                  <span className="text-muted">Find, Listen & Share</span>
	                  <span className="bottom wrapper-md block"><i className="icon-arrow-right i-lg pull-left"></i> -</span>
	                </a>
	                <a href="#">
	                  <img className="img-full" src="images/m44.jpg" alt="..." />
	                </a>
	              </div>
	              <div className="item pos-rlt">
	                <a href="#" className="item-overlay active opacity wrapper-md font-xs">
	                  <span className="block h3 font-bold text-danger-lter text-u-c">Top10</span>
	                  <span className="text-muted">Selected songs</span>
	                  <span className="bottom wrapper-md block">- <i className="icon-arrow-right i-lg pull-right"></i></span>
	                </a>
	                <a href="#">
	                  <img className="img-full" src="images/m45.jpg" alt="..." />
	                </a>
	              </div>
	            </div>
	          </section>
	        </section>
	      </section>
	    </section>
	  </section>
	)
}

export default Listen;