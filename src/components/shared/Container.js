import React from 'react'

const Container = (props) => {
    return (
        <div style={{flex:1,alignSelf:"center",display:"flex",flexDirection:"column",minWidth:"80vw",width:"100%"}}>
            {props.children}
        </div>
    )
}

export default Container
