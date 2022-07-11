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

    let modalStyles;
    switch(type)
    {
        case "error":
        {
            modalStyles = {backgroundColor: "#FFCCCC"}
        }
    }

    return (
        <>
            <Overlay/>
            <div className="modal" style={modalStyles}>
                <div className="modal__title">{title}</div>
                <div className="modal__content">{children}</div>
                <div className="modal__button">
                    <button onClick={changeVisibility}>Ok</button>
                </div>
            </div>

        </>
    );
};

export {Modal}