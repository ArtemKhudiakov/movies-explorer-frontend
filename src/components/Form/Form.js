import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Form({
                  name,
                  title,
                  inputs,
                  button,
                  text,
                  link
              })
{
    const fields = inputs.map((item) => (

        <div
            key={item.key}
            className="form__input-container">
            <label className="form__label">
                {item.label}
            </label>
            <input
                className="form__input"
                name={item.name}
                type={item.type}
                placeholder={item.placeholder}
                required={item.required}
            />
            <span className={`form__input-error ${item.name}-input-error`}></span>
        </div>

    ));

    return (

        <form
            name={name}
            className={`form form-${name}`}
        >
            <div className={`form__body ${name}__header`}>
                <div className="form__title-container">
                    <Link to="/" className="form__logo-link">
                        <img className="form__logo" src={logo} alt="Movies Explorer" />
                    </Link>
                    <h1 className="form__title">{title}</h1>
                </div>
            </div>
            <div className={`form__fieldset ${name}__fieldset`}>
                { fields }
            </div>
            <div className={`form__footer ${name}__footer`}>
                <button className="form__button register__button" type="submit">
                    {button}
                </button>
                <p className="form__close-text">
                    { text }&nbsp;
                    <Link
                        className="form__close-link"
                        to={ link.path }>
                        { link.title }
                    </Link>
                </p>
            </div>
        </form>

    );
}

export default Form;