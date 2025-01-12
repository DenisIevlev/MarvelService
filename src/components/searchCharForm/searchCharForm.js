import { Formik, Field, Form, ErrorMessage as FormikErrorMessage } from 'formik';
import { useState } from 'react';
import Error from '../error/error';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import './searchCharForm.scss';


const SearchCharForm = () => {

    const [char, setChar] = useState(null);
    const {  getCharacterByName, clearError, process, setProcess } = useMarvelService();


    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onCharLoaded)
            .then(setProcess('confirmed'));
    }

    const errorMessage = process === 'error' ? <div className="search__char-critical-error"><Error /></div> : null;
    const results = !char ? null : char.length > 0 ?
        <div className="search__char-wrapper">
            <div className="search__char-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="search__char-error">The character was not found. Check the name and try again.</div>;

    return (
        <div className="search__char-form">
            <Formik
                initialValues={{
                    charName: '',
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required!')
                })}
                onSubmit={({ charName }) => {
                    updateChar(charName);
                }}>
                <Form>
                    <label className="search__char-label" htmlFor="charName">Or find a character by name: </label>
                    <div className="search__char-wrapper">
                        <Field id="charName" name="charName" type="text" placeholder="Enter name" />
                        <button className="button button__main" type="submit" disabled={process === 'loading'}><div className="inner">find</div></button>
                    </div>
                    <FormikErrorMessage component="div" className="search__char-error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    );
}

export default SearchCharForm;