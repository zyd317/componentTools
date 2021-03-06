/**
 * @author yidi.zhao
 */
import React, {Component} from 'react';
import Dialog from '../Dialog';
import './style.scss';
const fn = () => {};
class PopAlert extends Component<SimpleComponentReact.PopAlertProps & any, SimpleComponentReact.PopAlertState & any> {
    initClose: () => void;
    scrollTimer: number;
    constructor(props: SimpleComponentReact.PopAlertProps) {
        super(props);
        this.scrollTimer = 0;
        this.open = this.open.bind(this);
        const {delayTime, noHide, handleClose} = this.props;
        this.close = this.close.bind(this);
        // 关闭弹窗的方式。因为本组件不能控制关闭，否则会丢失一些外部包裹的形式
        this.initClose = handleClose || this.close || fn;
        this.state = {
            content: '', // 文案
            status: 'success', // 提示类型,success/warning/error
            delayTime: delayTime || 2500,
            noHide,
            hide: true,
        };
    }

    /**
     * 只有props变了的时候才去执行
     * 先清除上一次的scrollTimer
     * 展示组件的时候!hide，如果没有noHide参数，且content有内容，表示需要自动消失
     * 隐藏组件的时候hide，清除scrollTimer。否则调用this.close的时候还是会触发这个
     */
    componentDidUpdate() {
        const {scrollTimer, state} = this;
        const { content, delayTime, noHide, hide } = state;
        if (hide) {
            clearTimeout(scrollTimer);
        }
        if (!noHide && content && !hide) {
            this.scrollTimer = setTimeout(this.initClose, delayTime);
        }
    }

    shouldComponentUpdate(
        nextProps: SimpleComponentReact.PopAlertProps & any,
        nextState: SimpleComponentReact.PopAlertState & any,
    ) {
        const propsObj = Object.entries(nextProps);
        const stateObj = Object.entries(nextState);
        const {props, state} = this;
        return !!(propsObj.find(
            (item: any) => (nextProps[item[0]] !== props[item[0]]))) ||
            !!(stateObj.find(
                (item: any) => (nextState[item[0]] !== state[item[0]])));
    }

    render() {
        const { content, status, hide } = this.state;
        if (hide) {
            return null;
        }
        return (
            <Dialog
                title=""
                showCloseIcon={false}
                buttons={[]}
                customClassName="__pop_alert_coo"
                close={this.initClose}
            >
                <div className={`dialog-status ${status}`}>{content}</div>
            </Dialog>
        );
    }

    open(config: SimpleComponentReact.PopAlertState) {
        this.setState({
            ...config,
            hide: false,
        });
    }

    close() {
        this.setState({
            hide: true,
        });
    }
}

export default PopAlert;
