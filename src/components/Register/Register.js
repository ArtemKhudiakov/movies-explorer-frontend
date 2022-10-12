import React from 'react';
import Form from '../Form/Form';

const INPUTS = [
    {
        key: 1,
        type: 'text',
        name: 'name',
        label: 'Имя',
        placeholder: 'Artem',
        required: true,
    },
    {
        key: 2,
        type: 'email',
        name: 'email',
        label: 'E-mail',
        placeholder: 'example@yandex.ru',
        required: true,
    },
    {
        key: 3,
        type: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: '********',
        require: true,
    }
];

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