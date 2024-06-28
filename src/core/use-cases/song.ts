
export interface CreateSong {
    name: string;
    url: string;
    userId:string
    playlistId:string
  }
  

  export interface UpdateSong{
    name?: string;
    url?: string;
  }
  
  export interface SongQuery {
    limit?: number;
    offset?: number;
    sort?: 'name' | 'createdAt' | 'updatedAt';
  }