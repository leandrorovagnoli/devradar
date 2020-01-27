import React from 'react';
import api from '../../services/api'
// import {handleEditSubmit} from '../DevForm/index'
import './style.css';

function DevItem({ dev }) {

    async function handleDeleteDev(e) {
        e.preventDefault();

        const { github_username } = dev;

        await api.delete('/delete', {
            header: {

            },
            data: {
                github_username
            }
        })
    }

    return (

        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt="dev.name" />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
                <form>
                    <input type="hidden" name="hidden-github_username" value={dev.github_username} />
                    <button className="btn-delete" type="submit" onClick={handleDeleteDev}>
                        <span className="icon-trash-can"></span>
                    </button>
                </form>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Acessar perfil no Github</a>
        </li>

    )
}

export default DevItem;