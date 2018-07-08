
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = require('graphql');

// dummy data
let posts = [
    { massage: 'Name of the Wind', id: '1', userId: '1' },
    { massage: 'The Final Empire', id: '2', userId: '2' },
    { massage: 'The Hero of Ages', id: '4', userId: '2' },
    { massage: 'The Long Earth', id: '3', userId: '3' },
    { massage: 'The Colour of Magic', id: '5', userId: '3' },
    { massage: 'The Light Fantastic', id: '6', userId: '3' },
];

let users = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' },
];
//////////////////


const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: ( ) => ({
        id: { type: GraphQLID },
        massage: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args){
                return _.find(users, { id: parent.userId });
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return _.filter(posts, { userId: parent.id });
            }
        }
    })
});

//////////////////

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                // code to get data from db / other source
                return posts;
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return _.find(posts, { id: args.id });
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                // code to get data from db / other source
                return users;
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(users, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
