import dell from "../images/dell.svg";
function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }
  return (
    <div className="template">
      <div className="element__item">
        <button className="element__link-img" type="button">
          <img
            className="element__foto"
            src={card.link}
            alt={card.name}
            onClick={handleCardClick}
          />
        </button>
        <button className="element__dell">
          <img className="element__img-dell" src={dell} alt="Удалить" />
        </button>
        <div className="element__mesto">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__box-like">
            <button className="element__like" type="button" />
            <p className="element__counterlike">{card.likes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
