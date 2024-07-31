import React, { Fragment, useState, useEffect, useContext } from 'react';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import AddPlaylist from '../music/AddPlaylist';
import useData from '../../hooks/useData';
import Player from '../player/Player';
import SinglePlaylist from '../music/singlePlaylist';
import { NavLink } from "react-router-dom";
import  AudioListContext  from "../../store/audioList-context";

function Playlist(props)	{
  const ctxAudio =  useContext(AudioListContext);

  const [createPlaylistModal, setCreatePlaylistModal]= useState(false);
  const [playlists, setPlaylists]= useState([]);
  const [playSong, setPlaySong]= useState({});
  
  const getAllPlaylistsAndSongs = () => {
      setPlaylists(ctxAudio.playlist);
  }

  const applyPlaylists = async(data) => {
    let ctx = ctxAudio.playlist;
    let currData = data;
    var result = ctx.concat(currData).filter(function(o) {  
      return this[o.key] ? false : this[o.key] = true;
    }, {});
    ctxAudio.onPlaylistUpdate(result);
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

  const playSongHandler = (playlistId, songSt, songData) => {
    if (playSong.hasOwnProperty('playlistId')) {
      if (playSong.playlistId === playlistId){
        if (songSt === 'active' ){
          setPlaySong({'playlistId': playlistId, 'state': ''});
          ctxAudio.onAudioListUpdate([]);
        } else {
          setPlaySong({'playlistId': playlistId, 'state': 'active'});
          ctxAudio.onAudioListUpdate(songData);
        }
      } else {
        setPlaySong({'playlistId': playlistId, 'state': 'active'});
        ctxAudio.onAudioListUpdate(songData);
      }
    } else {
      setPlaySong({'playlistId': playlistId, 'state': 'active'});
      ctxAudio.onAudioListUpdate(songData);
    }
  }
  
  const {fetchDataHandler: getPlaylists, loading: mainLoading} = useData();

  useEffect(() => {
    getAllPlaylists();
  },[]);

  useEffect(() => {
    getAllPlaylistsAndSongs();
  },[ctxAudio.playlist]);

  const createPlaylistHandler = () => {
    setCreatePlaylistModal(!createPlaylistModal);
  }
  
  let allPlaylists = 
    playlists.map((plist, index) => (
      <Fragment>
        <div key={index} className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
          <SinglePlaylist key={index} songData={plist} onPlaySong={playSongHandler} isPlaying={playSong}/>        
        </div>
        {index%2 != 0 ? <div class="clearfix visible-xs"></div> : ''}
      </Fragment>    
    ))

	return (
		<Fragment>
      <section id="content">
        {mainLoading && <Modal>Loading Songs...</Modal>}
        {createPlaylistModal && <Modal onClose={createPlaylistHandler}><AddPlaylist onClose={createPlaylistHandler}/></Modal>}
        <section className="hbox stretch">
          <section>
            <section className="vbox">
              <section className="scrollable padder-lg w-f-md" id="bjax-target">
                <span style={{cursor:"pointer"}} onClick={getAllPlaylists}  className="pull-right text-muted m-t-lg" data-toggle="class:fa-spin" >
                  <i className="icon-refresh i-lg  inline" id="refresh"></i>
                </span>
                <h2 className="font-thin m-b">Playlists <span className="musicbar animate inline m-l-sm" style={{"width":"20px","height":"20px"}}>
                  <span className="bar1 a1 bg-primary lter"></span>
                  <span className="bar2 a2 bg-info lt"></span>
                  <span className="bar3 a3 bg-success"></span>
                  <span className="bar4 a4 bg-warning dk"></span>
                  <span className="bar5 a5 bg-danger dker"></span>
                </span></h2>
                <button onClick={createPlaylistHandler} className="pull-right btn btn-lg btn-primary lt btn-rounded">
                  <i className="icon-plus pull-right"></i>Create Playlist&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
                <div className="row row-sm">
                  {allPlaylists}
                </div>
              </section>
            </section>
          </section>
        </section>
        <a href="#" className="hide nav-off-screen-block" data-toggle="class:nav-off-screen,open" data-target="#nav,html"></a>
      </section>
	  </Fragment>
	)
}

export default Playlist;