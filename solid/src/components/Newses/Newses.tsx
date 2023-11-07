import { For } from "solid-js";
import { TNews } from "@/components/Newses/News";

import News from "./News";

const Newses = (p: { newses: TNews[]; page?: number; total?: number }) => {
    return (
        <div class="flex flex-col gap-1">
            <For each={p.newses}>
                {(news: TNews, i) => (
                    <News
                        no={(p.total || 30) * ((p.page || 1) - 1) + i() + 1}
                        id={news.id}
                        title={news.title}
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

export default Newses;
