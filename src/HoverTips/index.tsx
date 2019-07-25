import React from 'react';
import './index.scss';
export default function HoverContainer (props: SimpleComponentReact.HoverContainerProps) {
    const {tips, className= '', position= 'top', children, icon} = props;
    let clas = 'content';
    // 如果是单行的话水平居中
    if (tips && typeof tips === 'string' && !(/<br \/>/.test(tips))) {
        clas += ' text_center';
    }
    return (
        <div {...props} className={`m_hover_container_tips ${className} ${position}`}>
            {icon ? icon : <div className={`icon ${(tips || children) ? 'active' : ''}`}/>}
            {(tips || children) ?
                <div className={clas}>
                    <div className="hover_content_main">
                        {tips || children}
                    </div>
                    <div className="hover_arrow_icon" />
                </div>
                : null
            }
        </div>
    );
}