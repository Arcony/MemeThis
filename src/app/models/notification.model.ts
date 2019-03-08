export interface Notification {
    _id:number;
    memeId: string;
    postId: string;
    userId: string;
    likeId: string;
    commentId: string;
    text: string;
    type: string;
    seen: Boolean;
    newNotifNb : number;
  }
  