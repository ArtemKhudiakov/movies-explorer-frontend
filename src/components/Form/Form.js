import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Form({
                  name,
                  title,
                  inputs,
                  button,
                  text,
                  link,
                  onSubmit,
                  userData,
                  onChange,
                  isDisabled
              })
{

    return (

        <form
            name={name}
            className={`form form-${name}`}
            onSubmit={onSubmit}
            noValidate
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
            {/*   */}
                {(window.location.pathname !== '/signin') && (
                    <div
                    key={inputs[0].key}
                    className="form__input-container">
                    <label className="form__label">
                {inputs[0].label}
                    </label>
                    <input
                    className="form__input"
                    name={inputs[0].name}
                    type={inputs[0].type}
                    placeholder={inputs[0].placeholder}
                    required={inputs[0].required}
                    value={userData.name.value || ""}
                    onChange={onChange}
                    />
                    <span className={`form__input-error ${inputs[0].name}-input-error`}>{userData.name.errorMessage}</span>
                    </div>
                    )}

                <div
                    key={inputs[1].key}
                    className="form__input-container">
                    <label className="form__label">
                        {inputs[1].label}
                    </label>
                    <input
                        className="form__input"
                        name={inputs[1].name}
                        type={inputs[1].type}
                        placeholder={inputs[1].placeholder}
                        required={inputs[1].required}
                        value={userData.email.value || ""}
                        onChange={onChange}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    />
                    <span className={`form__input-error ${inputs[1].name}-input-error`}>{userData.email.errorMessage}</span>
                </div>

                <div
                    key={inputs[2].key}
                    className="form__input-container">
                    <label className="form__label">
                        {inputs[2].label}
                    </label>
                    <input
                        className="form__input"
                        name={inputs[2].name}
                        type={inputs[2].type}
                        placeholder={inputs[2].placeholder}
                        required={inputs[2].required}
                        value={userData.password.value || ""}
                        onChange={onChange}
                    />
                    <span className={`form__input-error ${inputs[2].name}-input-error`}>{userData.password.errorMessage}</span>
                </div>
            {/*    */}
            </div>
            <div className={`form__footer ${name}__footer`}>
                <button className="form__button register__button" type="submit"  disabled={isDisabled}>
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