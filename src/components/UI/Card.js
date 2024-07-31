import React, { Fragment, useState, useEffect, useRef } from 'react';
import Header from '../layout/Header';
import SideBar from '../layout/SideBar';
import classes from './Card.module.css';
import Player from '../player/Player';
import Modal from './Modal';
import { useLocation } from "react-router-dom";

function Card(props)	{
	const cardRef = useRef(null);
	const location = useLocation();
	const [hide, setHide]= useState({"sidebar":true,"notification":true,"user":true,"searchBar":true});
	const toggleHandler = (whichComponent) => {
		if (whichComponent == 'sidebar') {
			setHide(prevState => {
				return {...prevState, "sidebar":!(hide.sidebar)}
			});
		}
		if (whichComponent == 'notification') {
			setHide(prevState => {
				return {...prevState, "notification":!(hide.notification), "user":true}
			});
			return;
		} 
		if (whichComponent == 'user') {
			setHide(prevState => {
				return {...prevState, "user":!(hide.user), "notification":true}
			});
		} else {
			if (whichComponent === '') {
				setHide(prevState => {
					return {...prevState, "searchBar":true}
				});
			} else {
				setHide(prevState => {
					return {...prevState, "searchBar":false}
				});
			}
		}
	}

	const initialHeaderState = () => {
		setHide(prevState => {
			return {...prevState, "user":true, "notification":true, "searchBar":true}
		});
	}
	
	useEffect(()=> {
		initialHeaderState();
	},[location]);

	const clickBody = (event) => {
    if (cardRef.current && !event.target.classList.contains('users') && !event.target.classList.contains('notifications')) {
      initialHeaderState();
    }
	}

	return (
		<section ref={cardRef} className="vbox" onClick={clickBody}>
			<Header headerClasses={props.headerClasses} 
				hideSideBar={hide.sidebar} 
				hideNotification={hide.notification} 
				hideUser={hide.user} 
				hideSearchBar={hide.searchBar} 
				onToggleSideBar={toggleHandler}
				onToggleNotification={toggleHandler}
				onToggleUser={toggleHandler}
				onToggleSearchBar={toggleHandler}
				/>
			<section>
      	<section className="hbox stretch">
					<SideBar hideSideBar={hide.sidebar} onToggleSideBar={toggleHandler}/>
					<Player/>
					<div className={`${classes.card} ${props.className}`}>
						{props.children}
					</div>
				</section>
			</section>
		</section>
	)
}

export default Card;