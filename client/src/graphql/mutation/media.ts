import { gql } from "@apollo/client";

export const markAsFavoriteMutation = gql`
  mutation markAsFavorite($publicId: String!, $markAsFavourite: Boolean!) {
    markAsFavorite(publicId: $publicId,markAsFavourite: $markAsFavourite)
  }
`;

export const addAlbumMutation = gql`
  mutation createAlbum($title: String!) {
    createAlbum(title: $title) {
      name
    }
  }
`
export const addToAlbumMutation = gql`
  mutation addToAlbum($albumName: String!, $publicId: [String]!) {
    addToAlbum(albumName: $albumName, publicId: $publicId)
  }
`

export const deleteAlbumMutation= gql`
  mutation deleteAlbum($name: String!) {
    deleteAlbum(name: $name)
  }
`