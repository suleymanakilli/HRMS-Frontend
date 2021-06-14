import React, { useState } from 'react'
import './Navi.css';
import { Search  } from '@material-ui/icons';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMore from '@material-ui/icons/ExpandMore';

export default function Navi() {
    const [open, setopen] = useState(false)
    function setOpenAndAddTransition(isOpen){
        setopen(isOpen);
        addTransition();
    }
    
    function addTransition(){
        var element=document.getElementsByClassName("dropdown-items")[0].classList
        element.toggle("active")
    }
    return (
        <div className="navi">
            <Container>
                <div className="menu-items-container">
                    <div className="menu-first-part">
                        <Link to={"/"}>
                            <div className="home menu-item">
                                HRMS
                            </div>
                        </Link>
                        
                        <Link to={"/jobadvertisementwithfilters"}>
                            <div className="search-job menu-item" >
                                <span>İş Ara</span>
                                <Search style={{ fontSize: 22 }}></Search>
                            </div>
                        </Link>
                        
                        <Link to={"/resumes"}>
                            <div className="menu-item">
                                Özgeçmişler
                            </div>
                        </Link>
                        <Link to={"/userresumes"}>
                            <div className="menu-item">
                                Özgeçmişlerim
                            </div>
                        </Link>
                        <Link to={"/addjobadvertisement"}>
                            <div className="menu-item">
                                İlan Yayınla
                            </div>
                        </Link>
                        
                        
                    </div>
                    <div className="menu-second-part" onClick={()=>setOpenAndAddTransition(!open)}>
                        <div className="menu-item">
                            <AccountCircle/>
                        </div>
                        <div className="menu-item auth">
                            <span className="login">Giriş Yap</span>
                            <span className="register">veya üye ol</span>
                        </div>
                        <div className="menu-item">
                            <ExpandMore/>
                        </div>
                        {open?<div className="dropdown-items"><DropdownItems/></div>:<div className="dropdown-items" style={{visibility:"hidden"}}><DropdownItems/></div>}
                        
                    </div>
                </div>
            </Container>
        </div>
    );
}
function DropdownItems(){
    return(
        <div id="dropdown-items">
            <a href='/login'>Giriş Yap</a>
            <a href='register'>Kayıt Ol</a>
        </div>
    );
}




