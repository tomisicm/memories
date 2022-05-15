export interface PostsFilterDto {
  includePrivate?: boolean;
  includeComments?: boolean;
  authorId?: string;
  title?: string;
}
