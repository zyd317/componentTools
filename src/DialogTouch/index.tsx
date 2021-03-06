/**
 * @author yidi.zhao
 * modal component only for show
 */
import React from 'react';
import './style.scss';
const fn = () => {};

export default function Dialog (props: SimpleComponentReact.DialogTouchProps) {
    const {title, customClassName, children, handleSure, handleClose, btnTextCancel, btnTextSure } = props;
    const newTitle = title === undefined ? '我知道了' : title;
    const newHandleSure = handleSure || fn;
    const newHandleClose = handleClose || fn;
    const newCustomClassName = customClassName || '';
    const newChildren = children === undefined ? 'success' : children;
    return (
        <div className={`__simple_dialog_coo_touch ${newCustomClassName}`}>
            <div className="modal" onClick={newHandleClose}/>
            <div className="dialog">
                {getTitle(newTitle)}
                {
                    newChildren ? <div className="dialog-body">{newChildren}</div> : null
                }
                <div className="m-btn">
                    {btnTextCancel ? <div onClick={newHandleClose} className="cancel">{btnTextCancel}</div> : null}
                    {btnTextSure ? <div onClick={newHandleSure} className="sure">{btnTextSure}</div> : null}
                </div>
            </div>
        </div>
    );
}

function getTitle (title: string) {
    if (!title) {
        return null;
    }
    return (
        <div className="dialog-header">{title}</div>
    );
}
