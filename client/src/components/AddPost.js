import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addPostMutation, getPostQuery } from '../queries/queries';

class AddPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: ''
        };
    }

    submitForm(e){
        e.preventDefault();

        this.props.addPostMutation({
            variables: {
                message: this.state.message,
                userId: "5b4236e601c69133b3defbe4"
            },
            refetchQueries: [{ query: getPostQuery }]
        });
    }
    render(){
        return(
            <form id="add-post" onSubmit={ this.submitForm.bind(this) } >
                <div className="field">
                    <label>Post message :</label>
                    <input type="text" onChange={ (e) => this.setState({ message: e.target.value }) } />
                </div>
                <button> Add </button>
            </form>
        );
    }
}

export default compose(
    graphql(addPostMutation, { name: "addPostMutation" })
)(AddPost);
