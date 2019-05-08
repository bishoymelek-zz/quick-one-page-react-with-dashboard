import React from 'react';

const modal = (props) => {
    return (
        <div
            className="modal-wrapper"
            style={{
                display: props.show ? 'block' : 'none',
            }}>
            <div className="header">
                <h3>{props.title || "Title"}</h3>
                <span className="close-modal-btn" onClick={props.close}>×</span>
            </div>
            <div className="body">
                {props.children}
            </div>
            <div className="footer">
                <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                <button className="btn-continue">CONTINUE</button>
            </div>
        </div>
    )
}

export default modal;
