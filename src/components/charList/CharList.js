import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import PropTypes from 'prop-types';
import { useState, useEffect, useMemo, useRef } from 'react';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner />
        case 'confirmed':
            return <Component  />
        case 'error':
            return <Error />
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    const [offset, setOffset] = useState(210);

    const { getAllCharacters, process, setProcess } = useMarvelService();

    const itemsRefs = useRef([]);

    const focusOnItem = (id) => {
        itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRefs.current[id].classList.add('char__item_selected');
        itemsRefs.current[id].focus();
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setItemLoading(false) : setItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }


    function renderItems(arr) {

        let items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li key={item.id} tabIndex={0} ref={element => itemsRefs.current[i] = element} className="char__item"
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">
                        {item.name}
                    </div>
                </li>
            );
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading);
    }, [process]);

    return (
        <div className="char__list">
            {elements}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    charId: PropTypes.number,
}

export default CharList;