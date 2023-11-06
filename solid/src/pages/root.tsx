import { For } from "solid-js";
import Layout from "../components/Layout";
import Container from "../components/ui/Container";
import newses from "../data/newses";
import News, { TNews } from "../components/root/News";

export default () => {
    return (
        <Layout>
            <Container>
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
                    <div class="flex justify-end">
                        <a href="/?p=2" class="px-1">
                            More
                        </a>
                    </div>
                </main>
            </Container>
        </Layout>
    );
};
