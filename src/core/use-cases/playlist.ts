export interface CreatePlaylist{
    title: string;
    description: string;
  
  }
export interface UpdatePlaylist {
    title?: string;
    description?: string;
    songs?: string[];
  }
  export interface PlaylistQuery{
    limit?: number;
    offset?: number;
    sort?: 'title' | 'createdAt' | 'updatedAt';
  }