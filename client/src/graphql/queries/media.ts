// import { graphql } from "@/gql";
import { gql } from "@apollo/client";

export const getAllMediaQuery = gql`
  query getAllMedia {
    getAllMedia {
      asset_id
      public_id
      format
      resource_type
      type
      created_at
      bytes
      tags
      width
      height
      tags
      asset_folder
      display_name
      url
      secure_url
    }
  }
`;

export const getMediaByTagsQuery = gql`
  query getMediaByTags($tags: [String]!) {
    getMediaByTags(tags: $tags) {
      asset_id
      public_id
      format
      resource_type
      type
      created_at
      bytes
      width
      tags
      height
      asset_folder
      display_name
      url
      secure_url
    }
  }
`;

export const getAllAlbumsQuery= gql`
  query getAllAlbums{
    getAllAlbums{
      name
    }
  }
`

export const getAlbumMediaQuery= gql`
  query getAlbumMedia($albumName: String!){
    getAlbumMedia(albumName: $albumName){
      asset_id
      public_id
      format
      resource_type
      type
      created_at
      bytes
      width
      tags
      height
      asset_folder
      display_name
      url
      secure_url
    }
  }
`