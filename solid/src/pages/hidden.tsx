import { createAddNavLink } from "@/helpers/primitives";
import { createGetHiddenNewsesQuery } from "@/queries/users";

import Stories from "@/components/Stories.tsx";

export default () => {
    createAddNavLink("hidden", "/hidden");

    const { stories, loading, page } = createGetHiddenNewsesQuery();

    return (
        <main>
            <Stories stories={stories()} page={page()} loading={loading()} more_page_prefix="/hidden?" />
        </main>
    );
};
