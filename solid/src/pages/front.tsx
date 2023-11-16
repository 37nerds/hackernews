import { createGetNewsesQuery } from "@/queries/newses";

import Newses from "@/components/Newses";

export default () => {
    const { newses, loading, page, date } = createGetNewsesQuery("date");

    return (
        <main>
            <div class="mb-[14px] ml-9 mt-[6px]">
                Stories from {date()}
                <div class="mt-[9px]">
                    Go back a{" "}
                    <span>
                        <a href="front?date=2019-07-08">day</a>
                    </span>
                    ,{" "}
                    <span>
                        <a>month</a>
                    </span>
                    , or{" "}
                    <span>
                        <a>year</a>
                    </span>
                    . Go forward a{" "}
                    <span>
                        <a>day</a>
                    </span>
                    ,{" "}
                    <span>
                        <a>month</a>
                    </span>
                    , or{" "}
                    <span>
                        <a>year</a>
                    </span>
                    .
                </div>
            </div>
            <Newses newses={newses()} page={page()} loading={loading()} />
        </main>
    );
};
