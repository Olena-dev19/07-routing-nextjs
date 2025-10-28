import { fetchNotes } from "@/lib/api";
import NotesPageDefault from "./Notes.client";
import css from "@/components/NotesPage/NotesPage.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Notes = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes(1, ""),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <section className={css.app}>
      <HydrationBoundary state={dehydratedState}>
        <NotesPageDefault />
      </HydrationBoundary>
    </section>
  );
};

export default Notes;

//
