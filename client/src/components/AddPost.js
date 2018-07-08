import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addPostMutation, getPostQuery } from '../queries/queries';

class AddPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            userId: '',
            error: ''
        };
    }

    submitForm(e){
        e.preventDefault();
        this.setState({
            error: ''
        });

        this.props.addPostMutation({
            variables: {
                message: this.state.message,
                userId: this.state.userId
            },
            refetchQueries: [{ query: getPostQuery }]
        }).then(null, (error) => {
            console.log(' Error : ', error);
            this.setState({
                error: 'error'
            });
        });
    }
    render(){
        return(
            <form id="add-post" onSubmit={ this.submitForm.bind(this) } >
                <div className="field">
                    <label>Post message :</label>
                    <input type="text" onChange={ (e) => this.setState({ message: e.target.value }) } />
                </div>
                <div className="field">
                    <label>User id :</label>
                    <input type="text" onChange={ (e) => this.setState({ userId: e.target.value }) } />
                </div>
                <button> Add </button>
            </form>
        );
    }
}

export default compose(
    graphql(addPostMutation, { name: "addPostMutation" })
)(AddPost);
