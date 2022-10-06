import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';


import img1 from '../../images/movies/pic__COLOR_pic.png';
import img2 from '../../images/movies/pic__COLOR_pic-1.png';
import img3 from '../../images/movies/pic__COLOR_pic-2.png';
import img4 from '../../images/movies/pic__COLOR_pic-3.png';
import img5 from '../../images/movies/pic__COLOR_pic-4.png';
import img6 from '../../images/movies/pic__COLOR_pic-5.png';
import img7 from '../../images/movies/pic__COLOR_pic-6.png';
import img8 from '../../images/movies/pic__COLOR_pic-7.png';
import img9 from '../../images/movies/pic__COLOR_pic-8.png';
import img10 from '../../images/movies/pic__COLOR_pic-9.png';
import img11 from '../../images/movies/pic__COLOR_pic-10.png';
import img12 from '../../images/movies/pic__COLOR_pic-11.png';
import {useLocation} from "react-router-dom";

function MoviesCardList()
{

    const movieList = [
        {
            key: 1,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img1,
            isSaved: false,
        },
        {
            key: 2,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img2,
            isSaved: false,
        },
        {
            key: 3,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img3,
            isSaved: true,
        },
        {
            key: 4,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img4,
            isSaved: false,
        },
        {
            key: 5,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img5,
            isSaved: true,
        },
        {
            key: 6,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img6,
            isSaved: false,
        },
        {
            key: 7,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img7,
            isSaved: false,
        },
        {
            key: 8,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img8,
            isSaved: false,
        },
        {
            key: 9,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img9,
            isSaved: false,
        },
        {
            key: 10,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img10,
            isSaved: true,
        },
        {
            key: 11,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img11,
            isSaved: false,
        },
        {
            key: 12,
            title: '33 слова о дизайне',
            duration: '1h 47m',
            image: img12,
            isSaved: false,
        },
    ];

    const location = useLocation().pathname;

    return(

        <section className="movies-card-list">

            {movieList
                .map((item, key) => (
                    item.isSaved || (window.location.pathname === '/movies') ?
                    <li className="movies-card-list__item saved-card-list__item" key={key}>
                        <MoviesCard title={item.title}
                                    duration={item.duration}
                                    image={item.image}
                                    isSaved={item.isSaved}/>
                    </li>
                        : null
                ))
            }

        </section>
    );
}

export default MoviesCardList;