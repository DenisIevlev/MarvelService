import Spinner from '../components/spinner/spinner';
import Error from '../components/error/error';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />
            break;
        case 'loading':
            return <Spinner />
            break;
        case 'confirmed':
            return <Component data={data} />
        case 'error':
            return <Error />
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent; 