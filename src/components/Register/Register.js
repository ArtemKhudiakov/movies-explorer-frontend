import React, {useEffect, useState} from 'react';
import Form from '../Form/Form';

const [userData, setUserData] = useState({
    name: {
        value: "",
        isValid: false,
        errorMessage: ""
    },
    email: {
        value: "",
        isValid: false,
        errorMessage: ""
    },
    password: {
        value: "",
        isValid: false,
        errorMessage: ""
    }
});

useEffect(() => {
    isValid ? setDisabled(false) : setDisabled(true);
}, [isValid]);

useEffect(() => {
    isLoading ? setDisabled(true) : setDisabled(false);
}, [isLoading]);


const LINK = {
    title: 'Войти',
    path: '/signin',
}

function Register() {
    return (
        <article className="register">
            <Form
                name="register"
                title='Добро пожаловать!'
                inputs={INPUTS}
                button='Зарегистрироваться'
                text='Уже зарегистрированы?'
                link={LINK}
            />
        </article>
    );
}

export default Register;