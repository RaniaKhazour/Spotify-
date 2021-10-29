export class Artist {
    external_urls: ExternalUrls
    followers: Followers
    genres: string[]
    href: string
    id: string
    image: Image | null
    name: string
    popularity: number
    constructor(dto: ArtistDTO){
      this.external_urls = dto.external_urls;
      this.followers = dto.followers;
      this.genres = dto.genres;
      this.href = dto.href;
      this.popularity = dto.popularity;
      this.name = dto.name;
      this.id = dto.id;
      this.image = dto.images && dto.images.length > 0 ? dto.images[0]: null;
    }
  }
  
  export interface ExternalUrls {
    spotify: string
  }
  
  export interface Followers {
    href: any
    total: number
  }
  
  export interface Image {
    height: number
    url: string
    width: number
  }
  
  export interface ArtistDTO {
    external_urls: ExternalUrls
    followers: Followers
    genres: string[]
    href: string
    id: string
    images: Image[]
    name: string
    popularity: number
    type: string
    uri: string
  }