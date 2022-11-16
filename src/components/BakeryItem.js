// TODO: create a component that displays a single bakery item
export default function BakeryItem(props) {
    const item = props.item;
    const count = props.count;
    return (
        <div className="item">
            <img className="item-image" src={item.image}></img>
            <div className="item-text">
                <div className="item-text-main">
                    <h2 className="item-h2">{item.name}</h2>
                    <p className="item-desc">{item.description}</p>
                </div>
                <div>
                    <span className="item-price">${item.price}</span> x {count}
                </div>
            </div>
        </div>
    )
}