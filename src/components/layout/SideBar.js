import React from 'react';
import { NavLink } from "react-router-dom";


function SideBar(props)	{
	return (
		<aside className={`bg-black dk aside hidden-print ${props.hideSideBar ? 'nav-xs' : 'nav-off-screen'}`} id="nav">          
      <section className="vbox">
        <section className="w-f-md scrollable">
          <div className="slim-scroll" data-height="auto" data-disable-fade-out="true" data-distance="0" data-size="10px" data-railopacity="0.2">
            <nav className="nav-primary hidden-xs">
              <ul className="nav bg clearfix">
                <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                  Discover
                </li>
                <li>
                  <NavLink to="/">
                    <i className="icon-disc icon text-success"></i>
                    <span className="font-bold">What's new</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/listen">
                    <i className="icon-list icon  text-info-dker"></i>
                    <span className="font-bold">Listen</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/playlist">
                    <i className="icon-list icon  text-info-dker"></i>
                    <span className="font-bold">My Playlists</span>
                  </NavLink>
                  <NavLink to="/genres">
                    <i className="icon-music-tone-alt icon"></i>
                    <span className="font-bold">Genres</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </section>
    </aside>
	)
}

export default SideBar;