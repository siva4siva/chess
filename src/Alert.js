import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { alertActions } from './action/alert_action';

class Alerts extends Component {

    clearButton = () => {
        this.props.dispatch(alertActions.clear());
    }

    render() {
        let alertStyle;
        if (this.props.alert.type === "alert-success") {
            alertStyle = "success";
        } else {
            alertStyle = "negative";
        }
        return (
            <div>
                {this.props.alert.message &&
                    <Message
                        className = {alertStyle } 
                        onDismiss={this.clearButton}
                        content={this.props.alert.message}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return { alert };
}

export default connect(mapStateToProps)(Alerts)