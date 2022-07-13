import React from 'react';

import "./Modal.css";


interface Props {
    children: React.ReactNode
    show: boolean;
    changeVisibility: () => void;
    title: string;
    type: "info" | "error" | "success";
}

const Overlay = () => {
    return (
        <div className="overlay">

        </div>
    );
};

const Modal = ({show, title, changeVisibility, children, type}: Props) => {

    if (!show) return null;

    let modalBackground;
    switch(type)
    {
        case "error":
        {
            modalBackground = {backgroundColor: "#FFCCCC"}
        }
    }

    return (
        <>
            <Overlay/>
            <div className="modal" style={modalBackground}>
                <div className="modal__title">{title}</div>
                <div className="modal__content">{children}</div>
                <div className="modal__button-container">
                    <button onClick={changeVisibility} style={modalBackground}>Ok</button>
                </div>
            </div>

        </>
    );
};

export {Modal}