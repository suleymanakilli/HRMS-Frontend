import React,{useState,useEffect} from 'react'
import parse from 'html-react-parser'
import './dropdown.css'

const Dropdown=(props)=>{
    const [open, setopen] = useState(false)
    const [itemName, setitemName] = useState([])
    useEffect(() => {
        props.children?.map((e)=>(setitemName(oldArray=>[...oldArray,e.props.itemName])))
        console.log(props)
    }, [])
    function setOpenAndAddTransition(isOpen){
        setopen(isOpen)
        addTransition()
    }
    function addTransition(){
        var element=document.getElementsByClassName("custom-dropdown-dropdown-items")[0].classList
        element.toggle("custom-dropdown-active")
        console.log(document.getElementsByClassName("custom-dropdown-dropdown-items")[0])
    }
    function DropdownItem(){
        return(
            <>
                {itemName.length>0?itemName.map((city)=>(<div className="custom-dropdown-dropdown-item-container" key={city}><span>{city}</span></div>)):null}
            </>
        )
    }
    return(
        <>
            <div className="custom-dropdown-dropdown" onClick={()=>setOpenAndAddTransition(!open)}>
                {props.customHtml?parse(props.customHtml):
                <div className="custom-dropdown-dropdown-custom">
                    <span>{props.name}</span>
                    <img src="expand_more.svg" alt="" />
                    {open?<div className="custom-dropdown-dropdown-items"><DropdownItem/></div>:<div className="custom-dropdown-dropdown-items" style={{visibility:"hidden"}}><DropdownItem/></div>}
                </div>
                }
            </div>
        </>
    )
}

export default Dropdown


