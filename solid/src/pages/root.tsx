import { createGetNewsesQuery } from "@/queries/stories";
import { useLoggedUser } from "@/contexts/logged_user";
import { filter_hidden_stories } from "@/helpers/logic";

import Newses from "@/components/Newses";

export default () => {
    const { stories, loading, page } = createGetNewsesQuery("home");
    const logger_user = useLoggedUser();
    return (
        <main>
            <Newses
                stories={filter_hidden_stories(stories(), logger_user?.data()?.hidden_story || [])}
                page={page()}
                loading={loading()}
            />
        </main>
    );
};
