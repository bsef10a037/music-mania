import React, { useContext, useRef, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import AudioListContext from "../../store/audioList-context";
import useData from "../../hooks/useData";

let firstOption='';
function Header(props)	{
  const navigate = useNavigate();
  const [suggSongs, setSuggSongs] = useState([]);
  const ctxUser = useContext(AuthContext);
  const ctxAudioList = useContext(AudioListContext);
  const { fetchDataHandler: getSeacrchResults, loading: headerLoading } = useData();
  const inputSearchRef = useRef('');
  const selectRef = useRef('');

  const gotSuggestedSongs = (data) => {
    props.onToggleSearchBar(inputSearchRef.current.value);
    setSuggSongs(data);
    firstOption = data[0].songName;
  }

  const gotSongs = (data) => {
    if (data.key === 'Enter') {
      const singleSong = JSON.parse(data.target[data.target.selectedIndex].getAttribute('songData'));
      ctxAudioList.onAudioListAdd({
        songId: singleSong.key,
        name: singleSong.songName,
        singer: singleSong.singerName,
        cover: ["images", singleSong.imageName].join("/"),
        musicSrc: singleSong.songSrc
      });
      props.onToggleSearchBar('');
      selectRef.current.value=null;
      return;
    } if (data.key !== 'ArrowDown' && data.key !== 'ArrowUp') {
      inputSearchRef.current.focus();
      selectRef.current.value = firstOption;
    }
  }

  const logoutHandler = (e) => {
    e.preventDefault();
    ctxUser.logout();
  }

  const updateSearchedSongs = (data) => {
    ctxAudioList.onSearchedSongsUpdate(data);
    navigate("/");
  }
  
  const searchHandler = (e) => {
    if (e.key === 'Enter') {
      getSeacrchResults('songsData.json',{
        method: 'GET',
        // method: 'POST',
        // body: JSON.stringify({"searchKey":inputSearchRef.current.value}),
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      },updateSearchedSongs);
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      selectRef.current.focus()
      return;
    }
    getSeacrchResults('songsData.json',{
      method: 'GET',
      // method: 'POST',
      // body: JSON.stringify({"searchKey":inputSearchRef.current.value}),
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },gotSuggestedSongs);
  }

  const songList = suggSongs.map((singleSong, index) => (<header onClick={() => gotSongs(singleSong)} className="pointer panel-heading">{singleSong.songName}<br/></header>));
  const songListOption = suggSongs.map((singleSong, index) => (<option songData={JSON.stringify(singleSong)} className="">{singleSong.songName}</option>));
  
	return (
		<header className={`${props.headerClasses} header header-md navbar navbar-fixed-top-xs`}>
      {headerLoading && <div>Searching Song ...</div>}
      <div className={`navbar-header aside bg-info ${props.hideSideBar ? 'nav-xs' : ''}`}>
        <a onClick={() => props.onToggleSideBar('sidebar')} className="btn btn-link visible-xs" data-toggle="class:nav-off-screen,open" data-target="#nav,html">
          <i className="icon-list"></i>
        </a>
        <NavLink to="/" className="navbar-brand text-lt">
          <i className="icon-earphones"></i>
          <img src="images/logo.png" alt="." className="hide" />
          <span className="hidden-nav-xs m-l-sm">Musik</span>
        </NavLink>
        <a className="btn btn-link visible-xs" data-toggle="dropdown" data-target=".user">
          <i className="icon-settings"></i>
        </a>
      </div>      
      <ul className="nav navbar-nav hidden-xs">
        <li>
          <a onClick={() => props.onToggleSideBar('sidebar')} className="text-muted pointer">
            <i className="fa fa-indent text"></i>
            <i className="fa fa-dedent text-active"></i>
          </a>
        </li>
      </ul>
      <div>
        <ul className="nav navbar-nav m-n hidden-xs nav-user user">
          <li className={`dropdown ${props.hideSearchBar ? '' : 'open'}`}>
            <form onSubmit={e => e.preventDefault()} className="navbar-form navbar-left input-s-lg m-t m-l-n-xs hidden-xs" role="search">
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-sm bg-white btn-icon rounded"><i className="fa fa-search"></i></button>
                  </span>
                  <input ref={inputSearchRef} type="text" className="form-control input-sm no-border rounded" placeholder="Search songs, albums..." onKeyDown={searchHandler} />
                </div>
              </div>
            </form>
            <select ref={selectRef} onKeyDown={gotSongs} size={props.hideSearchBar ? '' : suggSongs.length}
             style={{"minWidth":"1000px"}} className="dropdown-menu animated fadeInRight">
              {songListOption}
            </select>
          </li>
        </ul>
      </div>
      <div className="navbar-right ">
        <ul className="nav navbar-nav m-n hidden-xs nav-user user">
          <li className={`hidden-xs ${props.hideNotification ? '' : 'open'}`}>
            <a onClick={() => props.onToggleSideBar('notification')} className="notifications pointer dropdown-toggle lt" data-toggle="dropdown">
              <i className="icon-bell notifications"></i>
              <span className="badge badge-sm up bg-danger count notifications">2</span>
            </a>
            <section className="dropdown-menu aside-xl animated fadeInUp">
              <section className="panel bg-white">
                <div className="panel-heading b-light bg-light">
                  <strong>You have <span className="count">2</span> notifications</strong>
                </div>
                <div className="list-group list-group-alt">
                  <a href="#" className="media list-group-item">
                    <span className="pull-left thumb-sm">
                      <img src="images/a0.png" alt="..." className="img-circle" />
                    </span>
                    <span className="media-body block m-b-none">
                      Use awesome animate.css<br />
                      <small className="text-muted">10 minutes ago</small>
                    </span>
                  </a>
                  <a href="#" className="media list-group-item">
                    <span className="media-body block m-b-none">
                      1.0 initial released<br />
                      <small className="text-muted">1 hour ago</small>
                    </span>
                  </a>
                </div>
                <div className="panel-footer text-sm">
                  <a href="#" className="pull-right"><i className="fa fa-cog"></i></a>
                  <a href="#notes" data-toggle="class:show animated fadeInRight">See all the notifications</a>
                </div>
              </section>
            </section>
          </li>
          <li className={`dropdown ${props.hideUser ? '' : 'open'}`}>
            <a onClick={() => {props.onToggleUser('user')}} className="users pointer dropdown-toggle bg clear" data-toggle="dropdown">
              <span className="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                <img src="images/a0.png" alt="..." className="users" />
              </span>
              John.Smith <b className="caret"></b>
            </a>
            <ul className="dropdown-menu animated fadeInRight">            
              <li>
                <span className="arrow top"></span>
                <a href="#">Settings</a>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <a href="#">
                  <span className="badge bg-danger pull-right">3</span>
                  Notifications
                </a>
              </li>
              <li>
                <a href="docs.html">Help</a>
              </li>
              <li className="divider"></li>
              <li>
                <a onClick={logoutHandler} className="pointer" data-toggle="ajaxModal" >Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>      
    </header>
	)
}

export default Header;