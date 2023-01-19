export default function Cart({...props}){
    return(
        <div className="mainContainer">
            <button onClick={()=>props.changeView}>SEARCH</button>
            <h1>My Shopping Cart</h1>
            <div>
            {props.dataAsCartView}
            </div>
        </div>
    )
}