import React,{useState,useEffect} from 'react'
import './dropdown.css'
import JsxParser from 'react-jsx-parser'
import MoreVert from '@material-ui/icons/MoreVert';
const Dropdown=(props)=>{
    const [open, setopen] = useState(false)
    const [itemName, setitemName] = useState([])
    useEffect(() => {
        props.children?.map((e)=>(setitemName(oldArray=>[...oldArray,e.props.itemName])))
    }, [])
    function setOpenAndAddTransition(isOpen){
        setopen(isOpen)
        addTransition()
    }
    function addTransition(){
        for (let i = 0; i < document.getElementsByClassName("custom-dropdown-dropdown-items").length; i++) {
            document.getElementsByClassName("custom-dropdown-dropdown-items")[i].classList.toggle("custom-dropdown-active")
            
        }
        
    }
    function DropdownItem(){
        return(
            <>
                {itemName.length>0?itemName.map((item,index)=>(<div className="custom-dropdown-dropdown-item-container" key={index}><span>{item}</span></div>)):null}
            </>
        )
    }
    function customHtmlToReactComponent(){
        return <JsxParser
    
    components={{ MoreVert }}
    jsx={`
      ${props.customHtml}
    `}
  />
    }
    return(
        <>
            <div className="custom-dropdown-dropdown" onClick={()=>setOpenAndAddTransition(!open)}>
                {props.customHtml?
                <div className="dropdown-jsx-parser"  >
                    {customHtmlToReactComponent()}
                    {open?<div className="custom-dropdown-dropdown-items" style={{visibility:"visible"}}><DropdownItem/></div>:<div className="custom-dropdown-dropdown-items" style={{visibility:"hidden"}}><DropdownItem/></div>}
                </div>:
                <div className="custom-dropdown-dropdown-custom">
                    <span>{props.name}</span>
                    <img src="expand_more.svg" alt="" />
                    {open?<div className="custom-dropdown-dropdown-items" style={{visibility:"visible"}}><DropdownItem/></div>:<div className="custom-dropdown-dropdown-items" style={{visibility:"hidden"}}><DropdownItem/></div>}
                </div>
                }
            </div>
        </>
    )
}

export default Dropdown


