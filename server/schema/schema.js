
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// models
const Post = require('../models/post');
const User = require('../models/user');


const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: ( ) => ({
        id: { type: GraphQLID },
        message: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args){
                // code to get data from db / other source
                return User.findById(parent.userId);
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
                // code to get data from db / other source
                return Post.find({ userId: parent.id });
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
                return Post.find({});
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return Post.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                // code to get data from db / other source
                return User.find({});
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                const user = new User({
                    name: args.name,
                    age: args.age
                });
                return user.save();
            }
        },
        addPost: {
            type: PostType,
            args: {
                message: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                console.log(' ARGS : ', args);
                const post = new Post({
                    message: args.message,
                    userId: args.userId
                });
                return post.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
