import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';


const Bookings = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }

        })
            .then(res => res.json())
            .then(data => {
                setBookings(data)
            })
    }, [])


    return (
        <div>
            <h3>You have: {bookings.length} Bookings</h3>
            {
                bookings.map(book => <li>Name:{book.Name} from: {(new Date(book.checkInDate).toDateString('dd/MM/yyyy'))}To: {(new Date(book.checkOutDate).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;