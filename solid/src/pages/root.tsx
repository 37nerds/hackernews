import { For } from "solid-js";
import newses from "../data/newses";
import News, { TNews } from "../components/root/News";
import More from "../components/ui/More";

export default () => {
    return (
        <main class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
                <For each={newses}>
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
            <More href={"/?p=2"} />
        </main>
    );
};
