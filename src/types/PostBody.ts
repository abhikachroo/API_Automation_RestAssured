/**
 * TypeScript equivalent of postObjects.java (package postobjs).
 * Note: field `userId` maps to Java field `userid` — camelCase normalised.
 * Value `userId: 'new Post'` is preserved from the original source for
 * faithful migration traceability (see postreq() in postReqs.java).
 */
export interface PostBody {
  userId: string;
  id: string;
  title: string;
  body: string;
}
