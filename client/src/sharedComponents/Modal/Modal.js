import React from 'react';
import Form from '../Form';
const modal = (props) => {
    return (
        <div
            className="modal-wrapper"
            style={{
                display: props.show ? 'block' : 'none',
            }}>
            <header className="header">
                <h4 id="title">{props.title}</h4>
                <span className="close-modal-btn" onClick={props.close}>×</span>
            </header>
            <section className="body">
                {!props.children ?
                    <Form
                        shouldCleanTypeahead={props.shouldCleanTypeahead}
                        alert={props.alert}
                        formSubmitHandler={props.formSubmitHandler}
                        inputHandlers={props.formInputHandler}
                        isUpdating={props.isUpdating}
                        formData={props.formData} /> : props.children}
            </section>
            <footer className="footer">
                <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                {props.children ? (<button className="btn-continue">CONTINUE</button>) : null}
            </footer>
        </div>
    )
}

export default modal;
