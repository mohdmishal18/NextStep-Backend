import IComment from "../../entities/comment.entity";

export interface ICommentUsecase {
    getAllComments(post_id: string): Promise<IComment[]>
    createComment(author_id: string,post_id: string,content: string ):  Promise<IComment>
    editComment(commentId: string, content: string): Promise<IComment | null>
    deleteComment(commentId: string): Promise<IComment | null>
}