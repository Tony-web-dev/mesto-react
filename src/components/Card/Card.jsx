export default function Card({item, onCardClick}) {
    return (
        <div className="gallery__item">
            <button 
            className="gallery__trash" 
            type="button" 
            aria-label="Удалить" 
            />
            <img 
            className="gallery__img"
            src={item.link}
            alt={`Фото ${item.name}`}
            onClick={() => onCardClick({link: item.link, name: item.name})}
            />
            <div className="gallery__place">
                <h2 className="gallery__heading">{item.name}</h2>
                <div className="gallery__like-block">
                    <button
                        className="gallery__like"
                        type="button"
                        aria-label="Поставить лайк"
                    />
                    <p className="gallery__like-counter">0</p>
                </div>
            </div>
        </div>
    )
}