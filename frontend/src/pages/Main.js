import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

import './Main.css';

const Main = ( {match} ) => {
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect( () => {
        const loadUsers = async () => {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })

            console.log(response.data);
            setUsers(response.data);
        };

        loadUsers();

    }, [ match.params.id ]);

    useEffect( () => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        });

        socket.on('match', dev => {
            setMatchDev(dev);
        });
    }, [ match.params.id ]);

    const handleLike = async (id) => {
        console.log('like', id);
        await api.post(`/devs/${id}/likes`, 
                       null, 
                       { headers: { user: match.params.id } } );
        
        setUsers( users.filter(user => user._id !== id) );
    };

    const handleDislike = async (id) => {
        console.log('dislike', id);
        await api.post(`/devs/${id}/dislikes`, 
                       null, 
                       { headers: { user: match.params.id } } );
        
        setUsers( users.filter(user => user._id !== id) );
    };

    const usersList = () => {
        return (
            <ul>
                {users.map( user => (
                    <li key={user._id} >
                        <img src={user.avatar} alt={user.name} />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>

                        <div className="buttons">
                            <button type="button" onClick={ () => handleDislike(user._id) } >
                                <img src={dislike} alt="Dislike" />
                            </button>
                            <button type="button" onClick={ () => handleLike(user._id) } >
                                <img src={like} alt="Like" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    const usersListEmpty = () => {
        return (
            <div className="empty">
                Acabou :(
            </div>
        );
    };

    return (
        <div className="main-container" >
            <Link to="/" >
                <img src={logo} alt="Tindev" />
            </Link>

            { users.length > 0 ? ( usersList() ) : ( usersListEmpty() ) }

            { matchDev && (
                    <div className="match-container">
                        <img src={itsamatch} alt="It's a match"/>

                        <img className="avatar" src={matchDev.avatar} alt="" />
                        <strong>{matchDev.name}</strong>
                        <p>{matchDev.bio}</p>
                        <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
                    </div>
                )
            }            
        </div>
    );
};

export default Main;