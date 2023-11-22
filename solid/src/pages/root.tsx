import { createGetNewsesQuery } from "@/queries/newses";
import { useLoggedUser } from "@/contexts/logged_user";
import { filter_hidden_newses } from "@/helpers/logic";

import Newses from "@/components/Newses";

export default () => {
    const { newses, loading, page } = createGetNewsesQuery("home");
    const logger_user = useLoggedUser();
    return (
        <main>
            <Newses
                newses={filter_hidden_newses(newses(), logger_user?.data()?.hidden_news || [])}
                page={page()}
                loading={loading()}
            />
        </main>
    );
};
