import React, { Component } from 'react';
import { auth } from '../_firebase/index';
import { connect } from 'react-redux';
import { alertActions } from '../action/alert_action';
import { Button, Form, Input, Segment, Icon, Divider  } from 'semantic-ui-react';

class SignInPage extends Component {
    state = {
        email: '',
        password: ''
    }

    handelInput = (event) => {
        var changes = {};
        changes[event.target.name] = event.target.value;
        this.setState(changes)
    }

    handelSignInWithGoogle = () => {
        auth.doSignUpWithGoogle(this.props.dispatch)
        .then(()=>{
            this.props.history.push('/');
        });
    }

    handelSignIn = () => {
        var state = this.state;
        if (state.email !== '' && state.password !== '') {
            auth.doSignInWithEmailAndPassword(state.email, state.password, this.props.dispatch)
                .then((currentuser) => {
                    console.log(currentuser);
                    this.props.history.push('/');
                });
        } else {
            this.props.dispatch(alertActions.error('please enter all fields'));
        }
    }

    render() {
        return (
            <div>
                <Segment padded>
                    <Button color='google plus' onClick={this.handelSignInWithGoogle} fluid>
                        <Icon name='google' />SignIn With Google
                    </Button>
                    <Divider horizontal>Or</Divider>
                    <Form>
                        <Form.Field>
                            <label>Email</label>
                            <Input fluid placeholder='Email'
                                value={this.state.email}
                                name='email'
                                onChange={this.handelInput}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input fluid placeholder='Password'
                                value={this.state.password}
                                name='password'
                                onChange={this.handelInput}
                            />
                        </Form.Field>
                        <Button color='teal' onClick={this.handelSignIn} >Sign In</Button>
                    </Form>
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return { alert };
}

export default connect(mapStateToProps)(SignInPage);