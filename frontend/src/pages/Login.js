import React, {useState} from 'react';
import logo from '../assets/logo.svg';
import api from '../services/api';
import './Login.css';

const Login = ( {history} ) => {
    const [username, setUsername] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(username);

        const response = await api.post('/devs', { username: username });
        
        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    };

    return (
        <div className="login-container" >
            <form onSubmit={handleSubmit} >
                <img src={logo} alt="Tindev" />
                <input 
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={ e => setUsername(e.target.value) }
                />
                <button type="submit">Enviar</button>
            </form>
        </div>    
    );
};

export default Login;