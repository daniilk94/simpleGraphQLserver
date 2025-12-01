import {getUsers, getUserById, createUser, getUserDataMap, deleteUserById, updateUser} from './databases/db.js'
import {getAuthUser} from './databases/authdb.js'
import jwt from 'jsonwebtoken'

export const resolvers = {
    Query: {
        getAllData: (parent, args, context) => {
            if (!context.user)
                throw new Error('Unauthorized access')
            return getUsers()
        },
        getDataById: (parent, args) => {
            const id = Number(args.id)
            if(getUserById(id)){
                return getUserById(id)
            }
            throw new Error('User does not exist')
        },
        getUserData: (parent, args) => {
            const userId = getUserDataMap(args.username)
            if(!userId) return []
            const data = getUsers()
            return data.filter(person => userId.includes(person.id))
        },
    },
   User: {
        userOwnData: (parent) => {
            const userId = getUserDataMap(parent.username)
            if(!userId) return []    
            const data = getUsers()
            return data.filter(person => userId.includes(person.id)) 
        }
    },
    Mutation: {
        addData: (parent, args) => {
            const newUser = createUser({...args})
            return newUser
            
        },
        deleteData: (parent, args)=>{
            const id = Number(args.id)
            if(!getUserById(id)){
                throw new Error('Record doesn not exist')
            }
            else{
                const dataToShow = getUserById(id)
                deleteUserById(id)
                return dataToShow
            }
        },
        updateData: (parent, args)=> {
            const id = Number(args.id)
            const user = getUserById(id)
            if(!user){
                const newUser = createUser({forename: args.forename, surname: args.surname})
                return newUser
            }
            else{ 
                user.forename = args.forename
                user.surname = args.surname
            }
            return user
        },
        login: (parent, {username, password}) => {
            const user = getAuthUser(username)
            if( user && (user.password === password)) {
                const token = jwt.sign({username: username}, "my_secret_key", {
                    expiresIn: '1h'
                }) 

                return {
                    "username": username,
                    "access_token": token,
                    "token_type": "Bearer",
                    "expires_in": "1h"
                }
            } else
                throw new Error('Unauthorized') 
        }
    }
}