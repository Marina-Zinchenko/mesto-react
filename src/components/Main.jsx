import { useEffect, useState } from "react";
import api from "../utils/api.js";
import Card from "./Card.jsx";
import plus from "../images/plus.svg";
import pen from "../images/pen.svg";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onImageOpen }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setInitialCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInitialInfo(), api.getInitialCards()])
      .then(([dataUser, dataCard]) => {
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        setInitialCards(dataCard);
      })
      .catch((error) => console.error(`Ошибка в создании страницы ${error}`));
  }, []);

  return (
    <main>
      <section className="profile conteiner">
        <div className="profile__box">
          <button className="profile__edit" onClick={onEditAvatar}>
            <img className="profile__image" src={userAvatar} alt="Фото" />
          </button>
          <div className="profile__items">
            <div className="profile__item">
              <h1 className="profile__name">{userName}</h1>
              <button
                className="profile__button-pen"
                type="button"
                onClick={onEditProfile}
              >
                <img
                  className="profile__imag-pen"
                  src={pen}
                  alt="Редактировать профиль"
                />
              </button>
            </div>
            <p className="profile__about">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add" type="button">
          <img
            className="profile__button-add"
            src={plus}
            alt="Добавить изображение"
            onClick={onAddPlace}
          />
        </button>
      </section>

      <section className="element conteiner">
        <ul className="element__items">
          {cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={onImageOpen} />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
