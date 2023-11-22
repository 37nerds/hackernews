import { createAddNavLink } from "@/helpers/primitives";
import { createGetHiddenNewsesQuery } from "@/queries/users";

import Newses from "@/components/Newses";

export default () => {
    createAddNavLink("hidden", "/hidden");

    const { newses, loading, page } = createGetHiddenNewsesQuery();

    return (
        <main>
            <Newses newses={newses()} page={page()} loading={loading()} more_page_prefix="/hidden?" />
        </main>
    );
};
