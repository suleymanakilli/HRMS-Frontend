import React, { useState } from 'react'
import './Navi.css';
import { ExpandMore,AccountCircle,Search  } from '@material-ui/icons';
import { Container } from '@material-ui/core';

export default function Navi() {
    const [open, setopen] = useState(false)
    function setOpenChangeBgColorAddTransition(isOpen){
        setopen(isOpen);
        changeBgColor(isOpen);
        addTransition();

    }
    function changeBgColor(isOpen){
        if(isOpen){
            document.getElementsByTagName("BODY")[0].style.backgroundColor="rgba(0, 0, 0, 0.5)";
            document.getElementsByTagName("BODY")[0].querySelector("select").style.backgroundColor="gray";
            document.getElementsByTagName("BODY")[0].querySelector("input").style.backgroundColor="gray";
        }
        else{
            document.getElementsByTagName("BODY")[0].style.backgroundColor="white";
            document.getElementsByTagName("BODY")[0].querySelector("select").style.backgroundColor="white";
            document.getElementsByTagName("BODY")[0].querySelector("input").style.backgroundColor="white";
        }
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
                        <div className="home menu-item">
                            HRMS
                        </div>
                        <div className="search-job menu-item">
                            <span>İş Ara</span>
                            <Search style={{ fontSize: 22 }}></Search>
                        </div>
                        <div className="menu-item">
                            Özgeçmişler
                        </div>
                        <div className="menu-item">
                            İlan Yayınla
                        </div>
                    </div>
                    <div className="menu-second-part" onClick={()=>setOpenChangeBgColorAddTransition(!open)}>
                        <div className="menu-item">
                            <AccountCircle color="disabled"></AccountCircle>
                            
                        </div>
                        <div className="menu-item auth">
                            <span className="login">Giriş Yap</span>
                            <span className="register">veya üye ol</span>
                        </div>
                        <div className="menu-item">
                            <ExpandMore></ExpandMore>
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
            <a>Giriş Yap</a>
            <a>Kayıt Ol</a>
        </div>
    );
}



