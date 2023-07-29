import { useState, useCallback, useEffect } from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import ImagePopup from "./ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isRemovalPopupOpen, setIsRemovalPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setСurrentUser] = useState({});

  const [cards, setInitialCards] = useState([]);
  useEffect(() => {
    Promise.all([api.getInitialInfo(), api.getInitialCards()])
      .then(([dataUser, dataCard]) => {
        setСurrentUser(dataUser);
        setInitialCards(dataCard);
      })
      .catch((error) => console.error(`Ошибка в создании страницы ${error}`));
  }, []);

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

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setInitialCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(
          `Возникла ошибка при добавлении или удалении лайка, ${err}`
        );
      });
  }

  const handleCardDelete = (cadr) => {
    api
      .deleteCard(cadr._id)
      .then(() => {
        setInitialCards((cardItems) =>
          cardItems.filter((cardItem) => cardItem._id !== cadr._id)
        );
      })
      .catch((err) => {
        console.error(`Возникла ошибка при удалении карточки, ${err}`);
      });
  };

  function handleUpdateUser(dataInputProfile) {
    api
      .addUserInfo({ name: dataInputProfile.name, job: dataInputProfile.about })
      .then((res) => {
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Возникла ошибка при редактировании профиля, ${err}`);
      });
  }
  function handleUpdateAvatar(dataAvatar) {
    api
      .addNewAvatar(dataAvatar)
      .then((res) => {
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Возникла ошибка при смене аватара, ${err}`);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCards(data.name, data.link)
      .then((card) => {
        setInitialCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Возникла ошибка при добавлении новой карточки, ${err}`);
      });
  }

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsRemovalPopupOpen(false);
    setSelectedCard({});
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onImageOpen={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="removal"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isRemovalPopupOpen}
          onClose={closeAllPopups}
          onClicDelete={handleCardDelete}
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        ></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
