import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getPostQuery } from '../queries/queries';


class PostList extends Component {

    displayPosts(){
        const data = this.props.data;

        console.log( ' DATA : ', data.posts, data );

        if(data.loading){
            return( <div>Loading posts...</div> );
        } else if (!data.posts) {
            return( <div> error happend </div> );
        } else {
            return data.posts.map(post => {
                return(
                    <p key={ post.id }>
                        <span>
                            { post.message }
                        </span>
                            { ' - ' }
                        <span>
                            { post.user.name }
                        </span>
                        { ' ( id is : ' }
                        <span>
                            { post.user.id }
                        </span>
                        { ' ) ' }
                    </p>
                );
            })
        }
    }
    render(){
        return(
            <div>
                <div id="post-list">
                    { this.displayPosts() }
                </div>
            </div>
        );
    }
}

export default graphql(getPostQuery)(PostList);
