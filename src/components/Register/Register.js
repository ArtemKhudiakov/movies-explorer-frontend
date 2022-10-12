import React, {useEffect, useState} from 'react';
import Form from '../Form/Form';

function Register() {
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
const [disabled, setDisabled] = useState(false);
const isValid =
    userData.name.isValid &&
    userData.email.isValid &&
    userData.password.isValid;
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