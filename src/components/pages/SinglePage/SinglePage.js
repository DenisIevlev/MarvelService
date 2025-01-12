import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';
import AppBanner from '../../appBanner/AppBanner';
import setContent from '../../../utils/setContent';


const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { getComics, getCharacter, clearError, process, setProcess } = useMarvelService();


    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();
        switch (dataType) {
            case 'comics':
                getComics(id).then(onDataLoaded)
                .then(() => setProcess('confirmed'));
                break;
            case 'characters':
                getCharacter(id)
                .then(onDataLoaded)
                .then(() => setProcess('confirmed'));
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner />
            {setContent(process, Component, data)}
        </>
    );
}

export default SinglePage;
