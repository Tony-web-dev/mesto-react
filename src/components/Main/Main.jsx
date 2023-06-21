import React from "react";
import api from "../../utils/api.js";
import Card from "../Card/Card.jsx"

export default function Main( {onEditProfile, onEditAvatar, onAddPlace, onCardClick} ) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()]) 
        .then(([user, items]) => {
            setUserName(user.name);
            setUserDescription(user.about);
            setUserAvatar(user.avatar);
            setCards(items)
        })
        .catch(err => {
            console.log(err);
        });
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <button
                    className="profile__avatar-button"
                    type="button"
                    aria-label="Изменить аватар"
                    onClick={onEditAvatar}
                >
                    <img
                        className="profile__avatar"
                        src={userAvatar}
                        alt="Аватар пользователя" 
                    />
                </button>
                <div className="profile__info">
                    <div className="profile__name-block">
                        <h1 className="profile__name">{userName}</h1>
                        <button
                            className="profile__edit-button"
                            type="button"
                            aria-label="Редактировать профиль"
                            onClick={onEditProfile}
                        />
                    </div>
                    <p className="profile__about">{userDescription}</p>
                </div>
                <button
                    className="profile__gallery-add-button"
                    type="button"
                    aria-label="Добавить фото"
                    onClick={onAddPlace}
                />
            </section>
            <section className="gallery">
                {cards.map(items => {
                    return (
                        <Card item={items} key={items._id} onCardClick={onCardClick}/>  
                    )
                })}
            </section>
        </main>
    )
}

