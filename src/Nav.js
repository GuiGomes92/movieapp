import React, { useState, useEffect } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom'

export default function Nav() {
    const [isOpen, setOpen] = useState(false)
    const [wishlist, setWishlist] = useState([])

    function handleClick() {
        const data = JSON.parse(localStorage.getItem('wishlist'));
        console.log(data)
        setWishlist(data)
        console.log(wishlist)
        setOpen(v => !v)
    }

    return (
        <div className='root'>
            <p><Link to={"/"}>MTMN</Link></p>
            <div className='wishlistContainer'>
                <button className='wishlistBtn' onClick={() => handleClick()}>
                    Wishlist
                </button>
            </div>
            <div className="wishlistPopUp" style={{ display: isOpen ? "block" : "none" }}>
                <div className={"closeBtn"} onClick={() => handleClick()}>x</div>
                {wishlist.length > 0 ? wishlist.map(item => <Link to={`/${item.category}/movie/${item.id} `} key={item.id}>{item.title}</Link >) : <p>empty</p>}
            </div>
        </div>
    )
}