export const types = `#graphql
    type Memory{
        id: ID!
        title: String!
        description: String
        mediaUrl: String!
        mediaType: String!
        tags: [Tag]
        date: String!
        userId: ID!
        sharedWith: [SharedMemory]

        createdAt: String!
        updatedAt: String!
    }

    type SharedMemory{
        id: ID!
        memoryId: ID!
        sharedBy: ID!
        SharedTo: [SharedToUser]
    }

    type SharedToUser{
        id: ID!
        sharedMemoryId: ID!
        userID: ID!
        permission: [String]
    }

    type Album{
        name: String!
    }

    type Tag{
        id:   ID!
        name: String   
    }

    type Media{
        asset_id: String!
        public_id: String!
        format: String!
        resource_type: String!
        type: String!
        created_at: String!
        bytes: Int!
        tags: [String]!
        width: Int!
        height: Int!
        asset_folder: String!
        display_name: String!
        url: String!
        secure_url: String!
    }
`;
// {
//     asset_id: 'b2cc503066b8632f7c0c14ac06274b35',
//     public_id: 'samples/dessert-on-a-plate',
//     format: 'jpg',
//     version: 1733735090,
//     resource_type: 'image',
//     type: 'upload',
//     created_at: '2024-12-09T09:04:50Z',
//     bytes: 348717,
//     width: 1200,
//     height: 1200,
//     asset_folder: '',
//     display_name: 'dessert-on-a-plate',
//     url: 'http://res.cloudinary.com/dngf0msxx/image/upload/v1733735090/samples/dessert-on-a-plate.jpg',
//     secure_url: 'https://res.cloudinary.com/dngf0msxx/image/upload/v1733735090/samples/dessert-on-a-plate.jpg'
//   },
