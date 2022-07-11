import React from "react";

import "./MainContainer.css";

interface Props {
    children: React.ReactNode
}

const MainContainer = (props: Props) => {
    return <main className="main-container">
        {props.children}
    </main>
}

export {MainContainer};