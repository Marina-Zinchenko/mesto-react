import { useState, useCallback } from "react";
import "./App.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }, []);

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onImageOpen={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_type_name"
          id="name"
          type="text"
          name="name"
          placeholder="Имя Фамилия"
          minLength={2}
          maxLength={40}
          required=""
        />
        <span className="popup__error" id="name-error" />
        <input
          className="popup__input popup__input_type_job"
          id="job"
          type="text"
          name="about"
          placeholder="Напишите о себе"
          minLength={2}
          maxLength={200}
          required=""
        />
        <span className="popup__error" id="job-error" />
      </PopupWithForm>

      <PopupWithForm
        name="mesto"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_type_name"
          id="name"
          type="text"
          name="nameImage"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
        />
        <span className="popup__error" id="name-error" />
        <input
          className="popup__input popup__input_type_url-img"
          id="url-img"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="popup__error" id="url-img-error" />
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_type_url-avatar"
          id="url-avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на новый аватар"
          required=""
        />
        <span className="popup__error" id="url-avatar-error" />
      </PopupWithForm>

      <PopupWithForm
        name="removal"
        title="Вы уверены?"
        buttonText="Да"
        //isOpen={isImagePopupOpen}
        //onClose={closeAllPopups}
      ></PopupWithForm>

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      ></ImagePopup>
    </div>
  );
}

export default App;
