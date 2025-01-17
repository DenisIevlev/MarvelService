import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import CharList from "../../charList/CharList";
import CharInfo from "../../charInfo/CharInfo";
import RandomChar from "../../randomChar/RandomChar";
import SearchCharForm from '../../searchCharForm/searchCharForm';
import decoration from "../../../resources/img/vision.png";
import { useState } from "react";
import {Helmet, HelmetProvider} from 'react-helmet-async';


const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <HelmetProvider>
        <Helmet>
        <meta
        name="description"
        content="Marvel information portal"/>
        <title>Marvel information portal</title>
        </Helmet>
            <ErrorBoundary><RandomChar/></ErrorBoundary>
            <div className="char__content">
            <ErrorBoundary><CharList onCharSelected={onCharSelected} /></ErrorBoundary>
            <div>
            <ErrorBoundary><CharInfo charId={selectedChar} /></ErrorBoundary>
            <ErrorBoundary><SearchCharForm/></ErrorBoundary>
            </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </HelmetProvider>
    )
}

export default MainPage;