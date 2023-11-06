import { For } from "solid-js";
import { TNews } from "@/components/Newses/News";

import News from "./News";

export default (p: { newses: TNews[] }) => {
    return (
        <div class="flex flex-col gap-1">
            <For each={p.newses}>
                {(news: TNews, i) => (
                    <News
                        id={news.id}
                        title={news.title}
                        no={i() + 1}
                        url={news.url}
                        domain={news.domain}
                        points={news.points}
                        user={news.user}
                        time={news.time}
                        time_ago={news.time_ago}
                        comments_count={news.comments_count}
                        type={news.type}
                    />
                )}
            </For>
        </div>
    );
};
