import IComment from "../../entities/comment.entity"

export interface ICommentRepository{
    getCommentsByPostId(postId: string): Promise<IComment[]>
    createComment(author_id: string,post_id: string,content: string): Promise<IComment>
    editComment(commentId: string, content: string): Promise<IComment | null>
    deleteComment(commentId: string): Promise<IComment | null>
}