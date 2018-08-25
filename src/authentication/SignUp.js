import React, { Component } from 'react';
import { auth } from '../_firebase/index';
import { connect } from 'react-redux';
import { Button, Form, Input, Icon, Segment, Divider } from 'semantic-ui-react';

class SignUpPage extends Component {
    state = {
        email: '',
        password_one: '',
        password_two: '',
        name: ''
    }

    handelInput = (event) => {
        var changes = {};
        changes[event.target.name] = event.target.value;
        this.setState(changes)
    }

    handelSignUpWithGoogle = () => {
        auth.doSignUpWithGoogle(this.props.dispatch)
            .then(() => {
                this.props.history.push('/');
            });
    }

    handelSignUp = () => {
        var state = this.state;
        if (state.name !== '' && state.email !== '' && state.password_one !== '' &&
            state.password_two !== '' && state.password_one === state.password_two) {
            auth.doCreateUserWithEmailAndPassword(state.name, state.email, state.password_one, this.props.dispatch)
                .then(() => {
                    console.log(this.props);
                    this.props.history.push('/');
                });
        } else {
            console.log("not valid");
        }
    }

    render() {
        return (
            <div>
                <Segment padded>
                    <Button color='google plus' onClick={this.handelSignUpWithGoogle} fluid>
                        <Icon name='google plus' /> Google Plus
                    </Button>
                    <Divider horizontal>Or</Divider>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Name</label>
                                <Input fluid placeholder='Name'
                                    value={this.state.name}
                                    name='name'
                                    onChange={this.handelInput}
                                />
                            </Form.Field>
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
                                    value={this.state.password_one}
                                    name='password_one'
                                    onChange={this.handelInput}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm Password</label>
                                <Input fluid placeholder='Confirm Password'
                                    value={this.state.password_two}
                                    name='password_two'
                                    onChange={this.handelInput}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Button secondary fluid onClick={this.handelSignUp} >
                            Sign Up Now
                        </Button>
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

export default connect(mapStateToProps)(SignUpPage);