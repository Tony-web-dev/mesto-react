import { useEffect, useState } from 'react';
import api from "../../utils/api.js";
import Card from "../Card/Card.jsx"

export default function Main( {onEditProfile, onEditAvatar, onAddPlace, onCardClick, onDeleteCard} ) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userID, setUserID] = useState('');
    const [cards, setCards] = useState([])

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()]) 
        .then(([user, items]) => {
            setUserName(user.name);
            setUserDescription(user.about);
            setUserAvatar(user.avatar);
            setUserID(user._id);
            setCards(items);
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
                        <Card 
                        item={items} 
                        key={items._id} 
                        userID={userID}
                        onCardClick={onCardClick} 
                        onDeleteCard={onDeleteCard}
                        />  
                    )
                })}
            </section>
        </main>
    )
}

