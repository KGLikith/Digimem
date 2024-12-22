/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation markAsFavorite($publicId: String!, $markAsFavourite: Boolean!) {\n    markAsFavorite(publicId: $publicId,markAsFavourite: $markAsFavourite)\n  }\n": types.MarkAsFavoriteDocument,
    "\n  mutation createAlbum($title: String!) {\n    createAlbum(title: $title) {\n      name\n    }\n  }\n": types.CreateAlbumDocument,
    "\n  mutation addToAlbum($albumName: String!, $publicId: [String]!) {\n    addToAlbum(albumName: $albumName, publicId: $publicId)\n  }\n": types.AddToAlbumDocument,
    "\n  mutation deleteAlbum($name: String!) {\n    deleteAlbum(name: $name)\n  }\n": types.DeleteAlbumDocument,
    "\n    mutation addUser($email: String!, $firstName: String!, $lastName: String, $profileImageUrl: String) {\n        addUser(email: $email, firstName: $firstName, lastName: $lastName, profileImageUrl: $profileImageUrl) {\n            id\n        }\n    }\n": types.AddUserDocument,
    "\n  query getAllMedia {\n    getAllMedia {\n      asset_id\n      public_id\n      format\n      resource_type\n      type\n      created_at\n      bytes\n      tags\n      width\n      height\n      tags\n      asset_folder\n      display_name\n      url\n      secure_url\n    }\n  }\n": types.GetAllMediaDocument,
    "\n  query getMediaByTags($tags: [String]!) {\n    getMediaByTags(tags: $tags) {\n      asset_id\n      public_id\n      format\n      resource_type\n      type\n      created_at\n      bytes\n      width\n      tags\n      height\n      asset_folder\n      display_name\n      url\n      secure_url\n    }\n  }\n": types.GetMediaByTagsDocument,
    "\n  query getAllAlbums{\n    getAllAlbums{\n      name\n    }\n  }\n": types.GetAllAlbumsDocument,
    "\n  query getAlbumMedia($albumName: String!){\n    getAlbumMedia(albumName: $albumName){\n      asset_id\n      public_id\n      format\n      resource_type\n      type\n      created_at\n      bytes\n      width\n      tags\n      height\n      asset_folder\n      display_name\n      url\n      secure_url\n    }\n  }\n": types.GetAlbumMediaDocument,
    "\n  query currentUser {\n    currentUser {\n      id\n      email\n      profileImage\n      FirstName\n      LastName\n    }\n  }\n": types.CurrentUserDocument,
    "\n  query currentUserByEmail($email: String!) {\n    currentUserByEmail(email: $email) {\n      id\n      email\n      profileImage\n      FirstName\n      LastName\n    }\n  }\n": types.CurrentUserByEmailDocument,
    "\n  query currentUserById($id: String!) {\n    currentUserById(id: $id) {\n      id\n      email\n      profileImage\n      FirstName\n      LastName\n    }\n  }\n": types.CurrentUserByIdDocument,
    "\n  query verifyUser($email: String!, $firstName: String!, $lastName: String!, $profileImageUrl: String!) {\n    verifyUser(email: $email, firstName: $firstName, lastName: $lastName, profileImageUrl: $profileImageUrl)\n  }\n": types.VerifyUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation markAsFavorite($publicId: String!, $markAsFavourite: Boolean!) {\n    markAsFavorite(publicId: $publicId,markAsFavourite: $markAsFavourite)\n  }\n"): (typeof documents)["\n  mutation markAsFavorite($publicId: String!, $markAsFavourite: Boolean!) {\n    markAsFavorite(publicId: $publicId,markAsFavourite: $markAsFavourite)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAlbum($title: String!) {\n    createAlbum(title: $title) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createAlbum($title: String!) {\n    createAlbum(title: $title) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addToAlbum($albumName: String!, $publicId: [String]!) {\n    addToAlbum(albumName: $albumName, publicId: $publicId)\n  }\n"): (typeof documents)["\n  mutation addToAlbum($albumName: String!, $publicId: [String]!) {\n    addToAlbum(albumName: $albumName, publicId: $publicId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteAlbum($name: String!) {\n    deleteAlbum(name: $name)\n  }\n"): (typeof documents)["\n  mutation deleteAlbum($name: String!) {\n    deleteAlbum(name: $name)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation addUser($email: String!, $firstName: String!, $lastName: String, $profileImageUrl: String) {\n        addUser(email: $email, firstName: $firstName, lastName: $lastName, profileImageUrl: $profileImageUrl) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation addUser($email: String!, $firstName: String!, $lastName: String, $profileImageUrl: String) {\n        addUser(email: $email, firstName: $firstName, lastName: $lastName, profileImageUrl: $profileImageUrl) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllMedia {\n    getAllMedia {\n      asset_id\n      public_id\n      format\n      resource_type\n      type\n      created_at\n      bytes\n      tags\n      width\n      height\n      tags\n      asset_folder\n      display_name\n      url\n      secure_url\n    }\n  }\n"): (typeof documents)["\n  query getAllMedia {\n    getAllMedia {\n      asset_id\n      public_id\n      format\n      resource_type\n      type\n      created_at\n      bytes\n      tags\n      width\n      height\n      tags\n      asset_folder\n      display_name\n      url\n      secure_url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMediaByTags($tags: [String]!) {\n    getMediaByTags(tags: $tags) {\n      asset_id\n      public_id\n      format\n      resource_type\n      type\n      created_at\n      bytes\n      width\n      tags\n      height\n      asset_folder\n      display_name\n      url\n      secure_url\n    }\n  }\n"): (typeof documents)["\n  query getMediaByTags($tags: [String]!) {\n    getMediaByTags(tags: $tags) {\n      asset_id\n      public_id\n      format\n      resource_type\n      type\n      created_at\n      bytes\n      width\n      tags\n      height\n      asset_folder\n      display_name\n      url\n      secure_url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllAlbums{\n    getAllAlbums{\n      name\n    }\n  }\n"): (typeof documents)["\n  query getAllAlbums{\n    getAllAlbums{\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAlbumMedia($albumName: String!){\n    getAlbumMedia(albumName: $albumName){\n      asset_id\n      public_id\n      format\n      resource_type\n      type\n      created_at\n      bytes\n      width\n      tags\n      height\n      asset_folder\n      display_name\n      url\n      secure_url\n    }\n  }\n"): (typeof documents)["\n  query getAlbumMedia($albumName: String!){\n    getAlbumMedia(albumName: $albumName){\n      asset_id\n      public_id\n      format\n      resource_type\n      type\n      created_at\n      bytes\n      width\n      tags\n      height\n      asset_folder\n      display_name\n      url\n      secure_url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query currentUser {\n    currentUser {\n      id\n      email\n      profileImage\n      FirstName\n      LastName\n    }\n  }\n"): (typeof documents)["\n  query currentUser {\n    currentUser {\n      id\n      email\n      profileImage\n      FirstName\n      LastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query currentUserByEmail($email: String!) {\n    currentUserByEmail(email: $email) {\n      id\n      email\n      profileImage\n      FirstName\n      LastName\n    }\n  }\n"): (typeof documents)["\n  query currentUserByEmail($email: String!) {\n    currentUserByEmail(email: $email) {\n      id\n      email\n      profileImage\n      FirstName\n      LastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query currentUserById($id: String!) {\n    currentUserById(id: $id) {\n      id\n      email\n      profileImage\n      FirstName\n      LastName\n    }\n  }\n"): (typeof documents)["\n  query currentUserById($id: String!) {\n    currentUserById(id: $id) {\n      id\n      email\n      profileImage\n      FirstName\n      LastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query verifyUser($email: String!, $firstName: String!, $lastName: String!, $profileImageUrl: String!) {\n    verifyUser(email: $email, firstName: $firstName, lastName: $lastName, profileImageUrl: $profileImageUrl)\n  }\n"): (typeof documents)["\n  query verifyUser($email: String!, $firstName: String!, $lastName: String!, $profileImageUrl: String!) {\n    verifyUser(email: $email, firstName: $firstName, lastName: $lastName, profileImageUrl: $profileImageUrl)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;