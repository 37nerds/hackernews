import { createGetNewsesQuery } from "@/queries/newses";

import Newses from "@/components/Newses";

export default () => {
    const { newses, loading, page } = createGetNewsesQuery("home");

    return (
        <main>
            <Newses newses={newses()} page={page()} loading={loading()} />
        </main>
    );
};
