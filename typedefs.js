export const typeDefs = `
    """
    Authentication payload returned after a successful login.
    Contains the JWT token and related metadata
    """
    type AuthPayload {
        "The access token generated for the user"
        access_token: String!
        "The username used for login"
        username: String!
        "The needed Bearer token"
        token_type: String!
        "Time until the token expires"
        expires_in: String!
    }
    
    type User {
        username: String!
        userOwnData: [Data!]!   
    }

    type Data {
        id: ID!
        forename: String!
        surname: String!
    }

    type Query {
        """
        Retrieve all data records from the database
        """
        getAllData: [Data!]!
        "Retrieve specific record from the database"
        getDataById(id: ID!): Data!
        getUserData(username: String!): [Data!]
    }

    type Mutation {
        """
        Add data with given forename and surname, id adjusts automatically
        to the next free id. Shows user data after creation
        """
        addData(
            forename: String!
            surname: String!
        ): Data!
        """
        Delete data from the database by the given id. Shows the deleted data
        """
        deleteData(id: ID!): Data
        updateData(
            id: ID!
            forename: String!
            surname: String!
        ): Data!
        login(username: String!, password: String!): AuthPayload
    }
`