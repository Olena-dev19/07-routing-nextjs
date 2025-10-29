import { fetchNotes } from "@/lib/api";

import { NoteTag } from "@/types/note";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesPageDefault from "./Notes.client";

interface NotesByCategoryProps {
  params: Promise<{ slug: string[] }>;
}
const NotesByCategory = async ({ params }: NotesByCategoryProps) => {
  const { slug } = await params;
  const tag = slug?.[0];
  const searchTag = tag === "all" ? undefined : tag;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", searchTag],
    queryFn: () =>
      fetchNotes({
        defaultPage: 1,
        searchQuery: "",
        tag: searchTag as NoteTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageDefault tag={searchTag as NoteTag} />
    </HydrationBoundary>
  );
};
export default NotesByCategory;
