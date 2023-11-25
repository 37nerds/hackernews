import { createGetNewsesQuery } from "@/queries/stories";

import Stories from "@/components/Stories.tsx";

export default () => {
    const { stories, loading, page } = createGetNewsesQuery("home");

    return (
        <main>
            <Stories stories={stories()} page={page()} loading={loading()} />
        </main>
    );
};
