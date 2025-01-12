import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const ComicsList = (props) => {

    const setContent = (process, Component, newItemLoading) => {
        switch (process) {
            case 'waiting':
                return <Spinner />
                break;
            case 'loading':
                return newItemLoading ? <Component/> : <Spinner />
                break;
            case 'confirmed':
                return <Component  />
            case 'error':
                return <Error />
                break;
            default:
                throw new Error('Unexpected process state');
        }
    }

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [offset, setOffset] = useState(210);

    const { loading, error, getAllComics, process, setProcess } = useMarvelService();

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setItemLoading(false);
        setComicsEnded(ended);
        setOffset(offset => offset + 8);
    }

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setItemLoading(false) : setItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'));
    }

    function renderItems(arr) {
        let items = arr.map((item) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li key={item.id} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img" style={imgStyle} />
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            );
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

ComicsList.propTypes = {
    charId: PropTypes.number,
}

export default ComicsList;