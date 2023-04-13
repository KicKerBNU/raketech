export interface Filters {
    name: string
    status: string
    species: string
    type: string
    gender: string
    [key: string]: string;
  }

export interface Character {
    id: number
    name: string
    species: string
    status: string
    image: string
    type: string
    episode: string[]
  }

  export interface Hero {
    name: string
    gender: string
    imageUrl: string
  }
  
  export interface ApiResponse {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Character[];
  }