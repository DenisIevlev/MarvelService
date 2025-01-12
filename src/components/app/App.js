import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/spinner';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {lazy, Suspense} from 'react';

const Page404 = lazy(() => import('../pages/404/404'));
const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage/ComicsPage'));
const SingleComicsLayout = lazy(() => import('../pages/SingleComicsLayout/SingleComicsLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/SingleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage/SinglePage'));

const App = () => {


    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:id" element={<SinglePage Component={SingleComicsLayout} dataType="comics"/>}/> 
                        <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType="characters"/>}/>
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
};

export default App;