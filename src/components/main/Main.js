import React, { Fragment, useState, useEffect, useContext } from 'react';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import useData from '../../hooks/useData';
import Player from '../player/Player';
import Song from '../music/Song';
import NewSong from '../music/newSong';
import TopSong from '../music/topSong';
import { NavLink } from "react-router-dom";
import  AudioListContext  from "../../store/audioList-context";

function Main(props)	{
  const ctxAudio =  useContext(AudioListContext);

  const [songs, setSongs]= useState([]);
  const [playSong, setPlaySong]= useState({});
  
  const applySongs = (data) => {
    // If user searched song or list of songs
    if (ctxAudio.searchedSongs.length !== 0) {
      setSongs(ctxAudio.searchedSongs.slice(0,2));
    } else {
      setSongs(data);
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
  
  const {fetchDataHandler: getSongs, loading: mainLoading} = useData();
  useEffect(() => {
    getAllSongs();
  },[ctxAudio.searchedSongs]);

  let allSongs = 
    songs.slice(0,3).map((song, index) => (
      <Fragment>
        <div key={index} className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
          <Song key={index} songData={song} onPlaySong={playSongHandler} isPlaying={playSong} onAdd={addPlaylistHandler} onRemove={removePlaylistHandler}/>        
        </div>
        {index%2 != 0 ? <div class="clearfix visible-xs"></div> : ''}
      </Fragment>    
    ))

  let newSongs = 
    songs.slice(3,11).map((song, index) => (
      <div key={index} className="col-xs-6 col-sm-3">
        <NewSong key={index} songData={song} onPlaySong={playSongHandler} isPlaying={playSong} />        
      </div>    
    ))
  let i=1;  
  let topSongs = 
    songs.slice(11,16).map((song, index) => (
      <TopSong key={index} number={i++} songData={song} onPlaySong={playSongHandler} isPlaying={playSong} />  
    ))

	return (
		<Fragment>
      <section id="content">
        {mainLoading && <Modal>Loading Songs...</Modal>}
        <section className="hbox stretch">
          <section>
            <section className="vbox">
              <section className="scrollable padder-lg w-f-md" id="bjax-target">
                <span style={{cursor:"pointer"}} onClick={getAllSongs}  className="pull-right text-muted m-t-lg" data-toggle="class:fa-spin" ><i className="icon-refresh i-lg  inline" id="refresh"></i></span>
                <h2 className="font-thin m-b">Discover <span className="musicbar animate inline m-l-sm" style={{"width":"20px","height":"20px"}}>
                  <span className="bar1 a1 bg-primary lter"></span>
                  <span className="bar2 a2 bg-info lt"></span>
                  <span className="bar3 a3 bg-success"></span>
                  <span className="bar4 a4 bg-warning dk"></span>
                  <span className="bar5 a5 bg-danger dker"></span>
                </span></h2>
                <div className="row row-sm">
                  {allSongs}
                </div>
                <div className="row">
                  <div className="col-md-7">
                    <h3 className="font-thin">New Songs</h3>
                    <div className="row row-sm">
                      {newSongs}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <h3 className="font-thin">Top Songs</h3>
                    <div className="list-group bg-white list-group-lg no-bg auto">                          
                      {topSongs}
                    </div>
                  </div>
                </div>
                <div className="row m-t-lg m-b-lg">
                  <div className="col-sm-6">
                    <div className="bg-primary wrapper-md r">
                      <a href="#">
                        <span className="h4 m-b-xs block"><i className=" icon-user-follow i-lg"></i> Login or Create account</span>
                        <span className="text-muted">Save and share your playlist with your friends when you log in or create an account.</span>
                      </a>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="bg-black wrapper-md r">
                      <a href="#">
                        <span className="h4 m-b-xs block"><i className="icon-cloud-download i-lg"></i> Download our app</span>
                        <span className="text-muted">Get the apps for desktop and mobile to start listening music at anywhere and anytime.</span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
              <footer className="footer bg-info dker">
              </footer>
            </section>
          </section>
        </section>
        <a href="#" className="hide nav-off-screen-block" data-toggle="class:nav-off-screen,open" data-target="#nav,html"></a>
      </section>
	  </Fragment>
	)
}

export default Main;