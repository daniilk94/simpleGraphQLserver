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
        "Retrieve all data records from the database"
        getAllData: [Data!]!
        "Retrieve specific record from the database"
        getDataById(id: ID!): Data
        "Retrieve data belonging to the given user"
        getUserData(username: String!): [Data!]
        "Retrieve all users with provided forename"
        searchUser(forename: String!): [Data!]!
    }

    type Mutation {
        """
        Add data with given forename and surname, id adjusts automatically
        to the next free id. Displays data after creation
        """
        addData(
            forename: String!
            surname: String!
        ): Data!
        "Delete data from the database by the given id. Displays the deleted data"
        deleteData(id: ID!): Data
        """
        Create new data if id does not exist or update data by the given ID.
        Displays data after update
        """
        updateData(
            id: ID!
            forename: String!
            surname: String!
        ): Data!
        """
        Checks if user with given name and password exists. 
        Displays AuthPayLoad if exists, otherwise error
        """
        login(username: String!, password: String!): AuthPayload
    }
`;
