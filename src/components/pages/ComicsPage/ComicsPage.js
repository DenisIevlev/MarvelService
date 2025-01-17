import AppBanner from '../../appBanner/AppBanner';
import ComicsList from '../../comicsList/ComicsList';
import {Helmet, HelmetProvider} from 'react-helmet-async';

const ComicsPage = () => {
    return (
        <HelmetProvider>
        <Helmet>
        <meta
        name="Comics"
        content="Page with list of our comics"/>
        <title>Comics page</title>
        </Helmet>
            <AppBanner />
            <ComicsList />
        </HelmetProvider>
    )
}

export default ComicsPage;