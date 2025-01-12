import './SingleCharacterLayout.scss';
import {Helmet} from 'react-helmet';

const SingleCharacterLayout = ({ data }) => {
    const { name, description, thumbnail } = data;

    return (
        <>
        <Helmet>
        <meta name="Character" 
        content="Page with Character"/>
        <title>Character Page</title>
        </Helmet>
        <div className="single-character">
            <img src={thumbnail} alt={name} className="single-character__char-img" />
            <div className="single-character__info">
                <h2 className="single-character__name">{name}</h2>
                <p className="single-character__descr">{description}</p>
            </div>
        </div>
        </>
    );
}

export default SingleCharacterLayout;