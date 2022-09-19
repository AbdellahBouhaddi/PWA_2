import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { UidContext } from './AppContext'
import Logout from './Log/Logout'

const Navbar = () => {
  const [search, setsearch] = useState('')
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="icon" />
              <h3>LIKIDI</h3>
            </div>
          </NavLink>
          <div></div>
        </div>

        <input
        /*
          className="search"
          type="text"
          id="TypeProduit"
          Value={search}
          placeholder="chercher la categorie du produit"
          onChange={(e) => setsearch(e.target.value)}
          value={search}
          */
        />
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5> Bienvenue {userData.psuedo}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/profil">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
