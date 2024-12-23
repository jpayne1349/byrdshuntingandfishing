

export interface Relation {
    id: string;
    object_type: string; // Booking, Unit, User, File, etc
    object_id: string;
    
    db_path?: string;
    rms_link?: string;
    
    title?: string;
    description?: string;
    
  }