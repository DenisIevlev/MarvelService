import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const { request, clearError, process, setProcess } = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = '228825c10f935824d714762ef0982128';
    const _baseOffset = 210;

    const getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${_baseOffset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${_baseOffset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.substring(0, 210)}...` : 'There is no description about this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items ? char.comics.items : 'There is no description about this comics'
        }
    }
    const _transformComics = (comics) => {
          return {
            id: comics.id,
            name: comics.title,
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'NOT AVALIABLE',
            language: comics.textObjects[0]?.language || 'en-us',
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : "No information about the number of pages",
            description: comics.description ? `${comics.description.substring(0, 210)}...` : 'There is no description about this comics', 
          }
    }

    return { process, setProcess, getAllCharacters, getCharacter, getAllComics, getCharacterByName, getComics, clearError};
}

export default useMarvelService;