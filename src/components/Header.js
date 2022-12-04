import React, { useState } from "react";
import './style.css';

function Header({text}) {

    return (
        <header>
            <span>{text}</span>
        </header>
    );
}

export default Header;