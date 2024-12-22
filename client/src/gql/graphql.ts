/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Album = {
  __typename?: 'Album';
  name: Scalars['String']['output'];
};

export type Media = {
  __typename?: 'Media';
  asset_folder: Scalars['String']['output'];
  asset_id: Scalars['String']['output'];
  bytes: Scalars['Int']['output'];
  created_at: Scalars['String']['output'];
  display_name: Scalars['String']['output'];
  format: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  public_id: Scalars['String']['output'];
  resource_type: Scalars['String']['output'];
  secure_url: Scalars['String']['output'];
  tags: Array<Maybe<Scalars['String']['output']>>;
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type Memory = {
  __typename?: 'Memory';
  createdAt: Scalars['String']['output'];
  date: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mediaType: Scalars['String']['output'];
  mediaUrl: Scalars['String']['output'];
  sharedWith?: Maybe<Array<Maybe<SharedMemory>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToAlbum?: Maybe<Scalars['Boolean']['output']>;
  addUser?: Maybe<User>;
  createAlbum?: Maybe<Album>;
  deleteAlbum?: Maybe<Scalars['Boolean']['output']>;
  markAsFavorite?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddToAlbumArgs = {
  albumName: Scalars['String']['input'];
  publicId: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationAddUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateAlbumArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteAlbumArgs = {
  name: Scalars['String']['input'];
};


export type MutationMarkAsFavoriteArgs = {
  markAsFavourite: Scalars['Boolean']['input'];
  publicId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  currentUserByEmail?: Maybe<User>;
  currentUserById?: Maybe<User>;
  getAlbumMedia?: Maybe<Array<Maybe<Media>>>;
  getAllAlbums?: Maybe<Array<Maybe<Album>>>;
  getAllMedia?: Maybe<Array<Maybe<Media>>>;
  getMediaByTags?: Maybe<Array<Maybe<Media>>>;
  verifyUser?: Maybe<Scalars['String']['output']>;
};


export type QueryCurrentUserByEmailArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCurrentUserByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAlbumMediaArgs = {
  albumName: Scalars['String']['input'];
};


export type QueryGetMediaByTagsArgs = {
  tags: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QueryVerifyUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
};

export type SharedMemory = {
  __typename?: 'SharedMemory';
  SharedTo?: Maybe<Array<Maybe<SharedToUser>>>;
  id: Scalars['ID']['output'];
  memoryId: Scalars['ID']['output'];
  sharedBy: Scalars['ID']['output'];
};

export type SharedToUser = {
  __typename?: 'SharedToUser';
  id: Scalars['ID']['output'];
  permission?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sharedMemoryId: Scalars['ID']['output'];
  userID: Scalars['ID']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  FirstName: Scalars['String']['output'];
  LastName?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  memories?: Maybe<Array<Maybe<Memory>>>;
  profileImage?: Maybe<Scalars['String']['output']>;
};

export type MarkAsFavoriteMutationVariables = Exact<{
  publicId: Scalars['String']['input'];
  markAsFavourite: Scalars['Boolean']['input'];
}>;


export type MarkAsFavoriteMutation = { __typename?: 'Mutation', markAsFavorite?: boolean | null };

export type CreateAlbumMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateAlbumMutation = { __typename?: 'Mutation', createAlbum?: { __typename?: 'Album', name: string } | null };

export type AddToAlbumMutationVariables = Exact<{
  albumName: Scalars['String']['input'];
  publicId: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type AddToAlbumMutation = { __typename?: 'Mutation', addToAlbum?: boolean | null };

export type DeleteAlbumMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type DeleteAlbumMutation = { __typename?: 'Mutation', deleteAlbum?: boolean | null };

export type AddUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: { __typename?: 'User', id: string } | null };

export type GetAllMediaQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMediaQuery = { __typename?: 'Query', getAllMedia?: Array<{ __typename?: 'Media', asset_id: string, public_id: string, format: string, resource_type: string, type: string, created_at: string, bytes: number, tags: Array<string | null>, width: number, height: number, asset_folder: string, display_name: string, url: string, secure_url: string } | null> | null };

export type GetMediaByTagsQueryVariables = Exact<{
  tags: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type GetMediaByTagsQuery = { __typename?: 'Query', getMediaByTags?: Array<{ __typename?: 'Media', asset_id: string, public_id: string, format: string, resource_type: string, type: string, created_at: string, bytes: number, width: number, tags: Array<string | null>, height: number, asset_folder: string, display_name: string, url: string, secure_url: string } | null> | null };

export type GetAllAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAlbumsQuery = { __typename?: 'Query', getAllAlbums?: Array<{ __typename?: 'Album', name: string } | null> | null };

export type GetAlbumMediaQueryVariables = Exact<{
  albumName: Scalars['String']['input'];
}>;


export type GetAlbumMediaQuery = { __typename?: 'Query', getAlbumMedia?: Array<{ __typename?: 'Media', asset_id: string, public_id: string, format: string, resource_type: string, type: string, created_at: string, bytes: number, width: number, tags: Array<string | null>, height: number, asset_folder: string, display_name: string, url: string, secure_url: string } | null> | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, email: string, profileImage?: string | null, FirstName: string, LastName?: string | null } | null };

export type CurrentUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CurrentUserByEmailQuery = { __typename?: 'Query', currentUserByEmail?: { __typename?: 'User', id: string, email: string, profileImage?: string | null, FirstName: string, LastName?: string | null } | null };

export type CurrentUserByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CurrentUserByIdQuery = { __typename?: 'Query', currentUserById?: { __typename?: 'User', id: string, email: string, profileImage?: string | null, FirstName: string, LastName?: string | null } | null };

export type VerifyUserQueryVariables = Exact<{
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  profileImageUrl: Scalars['String']['input'];
}>;


export type VerifyUserQuery = { __typename?: 'Query', verifyUser?: string | null };


export const MarkAsFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"markAsFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markAsFavourite"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markAsFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"publicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicId"}}},{"kind":"Argument","name":{"kind":"Name","value":"markAsFavourite"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markAsFavourite"}}}]}]}}]} as unknown as DocumentNode<MarkAsFavoriteMutation, MarkAsFavoriteMutationVariables>;
export const CreateAlbumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAlbum"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAlbum"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateAlbumMutation, CreateAlbumMutationVariables>;
export const AddToAlbumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addToAlbum"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"albumName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicId"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToAlbum"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"albumName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"albumName"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicId"}}}]}]}}]} as unknown as DocumentNode<AddToAlbumMutation, AddToAlbumMutationVariables>;
export const DeleteAlbumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAlbum"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAlbum"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<DeleteAlbumMutation, DeleteAlbumMutationVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileImageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const GetAllMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"resource_type"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"bytes"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset_folder"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}}]} as unknown as DocumentNode<GetAllMediaQuery, GetAllMediaQueryVariables>;
export const GetMediaByTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMediaByTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMediaByTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"resource_type"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"bytes"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"asset_folder"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}}]} as unknown as DocumentNode<GetMediaByTagsQuery, GetMediaByTagsQueryVariables>;
export const GetAllAlbumsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllAlbums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAlbums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllAlbumsQuery, GetAllAlbumsQueryVariables>;
export const GetAlbumMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAlbumMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"albumName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAlbumMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"albumName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"albumName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset_id"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"resource_type"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"bytes"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"asset_folder"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}}]} as unknown as DocumentNode<GetAlbumMediaQuery, GetAlbumMediaQueryVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"FirstName"}},{"kind":"Field","name":{"kind":"Name","value":"LastName"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const CurrentUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"currentUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUserByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"FirstName"}},{"kind":"Field","name":{"kind":"Name","value":"LastName"}}]}}]}}]} as unknown as DocumentNode<CurrentUserByEmailQuery, CurrentUserByEmailQueryVariables>;
export const CurrentUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"currentUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"FirstName"}},{"kind":"Field","name":{"kind":"Name","value":"LastName"}}]}}]}}]} as unknown as DocumentNode<CurrentUserByIdQuery, CurrentUserByIdQueryVariables>;
export const VerifyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"verifyUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileImageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}}}]}]}}]} as unknown as DocumentNode<VerifyUserQuery, VerifyUserQueryVariables>;