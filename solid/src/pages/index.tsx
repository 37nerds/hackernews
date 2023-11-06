import { For } from "solid-js";
import Layout from "../components/Layout";
import Container from "../components/ui/Container";
import newses, { TNews } from "../data/newses";
import News from "../components/index/News";

export default () => {
    return (
        <Layout>
            <Container>
                <main class="flex flex-col gap-3">
                    <div class="flex flex-col gap-1">
                        <For each={newses}>{(news: TNews) => <News title={news.title} />}</For>
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
