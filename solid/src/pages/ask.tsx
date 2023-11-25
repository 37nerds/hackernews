import { createGetNewsesQuery } from "@/queries/stories";

import Stories from "@/components/Stories";

export default () => {
    const { stories, loading, page } = createGetNewsesQuery("ask");

    return (
        <main>
            <Stories stories={stories()} page={page()} loading={loading()} more_page_prefix="/ask?" />
        </main>
    );
};
