import React from "react";
import Form from "../Form/Form";

const INPUTS = [
    {
        key: 1,
        type: 'email',
        name: 'email',
        label: 'E-mail',
        placeholder: 'E-mail',
        required: true,
    },
    {
        key: 2,
        type: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
        require: true,
    }
];

const LINK = {
    title: 'Регистрация',
    path: '/signup',
}

function Login() {
    return (
        <article className="login">
            <Form
                name="auth"
                title='Рады видеть!'
                inputs={INPUTS}
                button='Войти'
                text='Еще не зарегистрированы?'
                link={LINK}
            />
        </article>
    );
}

export default Login;