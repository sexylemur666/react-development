import {FILTER_LABELS} from "../App.js"

// A component that displays a single bakery item
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
                <div className="item-text-price">
                    <span className="item-price">
                        <span className="item-price-lg">${item.price}</span>
                        <span className="item-price-sm"> x {count}</span>
                    </span>
                    <i><span className="item-category">
                        {FILTER_LABELS[item.hash % FILTER_LABELS.length]}
                    </span></i>
                </div>
            </div>
        </div>
    )
}
