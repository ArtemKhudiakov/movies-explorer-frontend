import React from "react";
import photo from '../../images/photo.jpg';

function AboutMe() {
    return(
        <section className="about-me" id='about-me'>
            <h2 className='about-me__header'>Студент</h2>
            <div className="about-me__container">
                <div className="about-me__info">
                    <div className="about-me__more">
                        <h3 className="about-me__title">Виталий</h3>
                        <p className="about-me__subtitle">Frontend Developer</p>
                        <p className="about-me__text">
                            Я родился и живу в Саратове,
                            закончил факультет экономики СГУ.
                            У меня есть жена
                            и дочь. Я люблю слушать музыку,
                            а ещё увлекаюсь бегом. Недавно начал кодить.
                            С 2015 года работал в компании «СКБ Контур».
                            После того, как прошёл курс по веб-разработке,
                            начал заниматься фриланс-заказами и ушёл с постоянной работы.
                        </p>
                    </div>
                    <a className="about-me__github" href="https://github.com/artemkhudiakov"  target="_blank" rel="noreferrer">
                        Github
                    </a>
                </div>
                <div className="about-me__photo">
                    <img className="about-me__photo-image" src={photo} alt="Фото" />
                </div>
            </div>
        </section>
    );
}

export default AboutMe;