import React, { useState, useEffect } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom'

export default function Nav() {
    const [isOpen, setOpen] = useState(false)
    const [isWishlist, setWishlist] = useState([])

    // function handleWishlist() {
    //     if (localStorage.getItem('wishlist')) {
    //         const wishlist = JSON.parse(localStorage.getItem('wishlist'));
    //         console.log(wishlist)
    //         setWishlist([wishlist])
    //         console.log(isWishlist)
    //     }
    // }

    function handleClick() {
        setOpen(v => !v)
    }

    useEffect(() => {
        //handleWishlist()
    })

    return (
        <div className='root'>
            <p><Link to={"/"}>MTMN</Link></p>
            <div className='wishlistContainer'>
                <div className='wishlistBtn' onClick={() => handleClick()}>
                    <p>Wishlist </p>
                    <div><p>0</p></div>
                </div>
                <div className="wishlistPopUp" style={{ display: isOpen ? "block" : "none" }}>
                    {/* {isWishlist.map(item => <p>{item}</p>)} */}
                </div>
            </div>
        </div>
    )

}