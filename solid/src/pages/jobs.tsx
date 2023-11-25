import { createGetNewsesQuery } from "@/queries/stories";

import Stories from "@/components/Stories.tsx";

export default () => {
    const { stories, loading, page } = createGetNewsesQuery("jobs");

    return (
        <main>
            <Stories stories={stories()} page={page()} loading={loading()} more_page_prefix="/jobs?" />
        </main>
    );
};
