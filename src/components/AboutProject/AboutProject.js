import React from 'react';

function AboutProject() {
    return (

        <section className="about-project" id='about_project'>
            <h2 className='about-project__header'>О проекте</h2>

            <div className='about-project__items'>
                <h3 className='about-project__items-title' id='title-1'>Дипломный проект включал 5 этапов</h3>
                <h3 className='about-project__items-title' id='title-2'>На выполнение диплома ушло 5 недель</h3>
                <p className='about-project__items-subtitle' id='text-1'>Составление плана, работу над бэкендом, вёрстку,
                    добавление функциональности и финальные доработки.</p>
                <p className='about-project__items-subtitle' id='text-2'>У каждого этапа был мягкий и жёсткий дедлайн, которые
                    нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className='about-project__texts'>
                <h3 className='about-project__text about-project__text_size-1'>1 неделя</h3>
                <h3 className='about-project__text about-project__text_size-2'>4 недели</h3>
            </div>
            <div className='about-project__tasks'>
                <p className='about-project__task about-project__task_size_1'>Back-end</p>
                <p className='about-project__task about-project__task_size_2'>Front-end</p>
            </div>

        </section>
    );
}

export default AboutProject;
