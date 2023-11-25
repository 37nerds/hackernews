import { createVoteMutation, type TNews } from "@/queries/stories";

import { For, Show, Suspense, createEffect } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { display_from_now } from "@/helpers/time";
import { story_per_page } from "@/config/misc";
import { createAddHideMutation, createGetPathname } from "@/queries/users";
import { useIsUserLoggedIn, useLoggedUser } from "@/contexts/logged_user";

import Triangle from "@/components/icons/Triangle";
import Loading from "./ui/Loading";

const Unvote = (p: { storyId: string }) => {
    const vote_mutation = createVoteMutation();
    const logged_user = useLoggedUser();

    return (
        <Show when={logged_user?.data()?.voted_story?.find(story_id => p.storyId === story_id)}>
            |{" "}
            <button
                onClick={() => {
                    vote_mutation.mutate({ story_id: p.storyId, operation: "remove" });
                }}
                disabled={vote_mutation.isPending}
                class="hover:underline"
            >
                unvote
            </button>
        </Show>
    );
};

const Vote = (p: { storyId: string }) => {
    const navigate = useNavigate();
    const isUserLoggedIn = useIsUserLoggedIn();
    const voteMutation = createVoteMutation();
    const loggedUser = useLoggedUser();

    const handleClick = () => {
        if (!isUserLoggedIn) {
            navigate("/login");
            return;
        }
        voteMutation.mutate({ story_id: p.storyId, operation: "add" });
    };

    return (
        <div class="h-3 w-3">
            <Show when={!loggedUser?.data()?.voted_story?.find(story_id => story_id === p.storyId)}>
                <button class="items-top flex h-3 w-3" onClick={handleClick}>
                    <Triangle />
                </button>
            </Show>
        </div>
    );
};

const Hide = (p: { storyId: string }) => {
    const { loading, mutate } = createAddHideMutation();

    const pathname = createGetPathname();

    createEffect(() => {
        console.log(pathname());
    });

    const isLoggedUser = useIsUserLoggedIn();
    const navigate = useNavigate();

    const handleClick = () => {
        if (!isLoggedUser) {
            navigate("/login");
            return;
        }
        mutate()({ story_id: p.storyId, operation: pathname() === "/hidden" ? "remove" : "add" });
    };

    return (
        <button onClick={handleClick} disabled={loading()} class="hover:underline">
            {pathname() === "/hidden" ? "un-hide" : "hide"}
        </button>
    );
};

const News = (p: TNews & { no: number }) => {
    return (
        <div class="flex gap-1 rounded bg-primary-bg px-1 py-0.5">
            <div class="items-top flex gap-1">
                <div class="min-w-5 text-end text-secondary">{p.no}.</div>
                <Vote storyId={p._id} />
            </div>
            <div class="flex flex-col">
                <div class="flex items-center gap-1">
                    <A href={p.url} target="_blank" class="text-primay text-sm">
                        {p.title}
                    </A>
                    <A href={`/from?site=${p.domain}`} class="text-[11px] text-secondary hover:underline">
                        ({p.domain})
                    </A>
                </div>
                <div class="text-[11px] text-secondary">
                    {p.points} points by{" "}
                    <A href={`/user/${p.user}`} class="hover:underline">
                        {p.user}
                    </A>{" "}
                    |{" "}
                    <A title={new Date().toUTCString()} href={`/item?id=${p._id}`} class="hover:underline">
                        {display_from_now(p.created_at)}
                    </A>{" "}
                    <Unvote storyId={p._id} /> | <Hide storyId={p._id} /> |{" "}
                    <A href={`/item?id=${p._id}`} class="hover:underline">
                        <Show when={p?.comments_count || 0 > 0} fallback="discuss">
                            {p.comments_count} comments
                        </Show>
                    </A>
                </div>
            </div>
        </div>
    );
};

const NewsesList = (p: { stories: TNews[]; page?: number; total?: number }) => {
    return (
        <div class="flex flex-col gap-1">
            <For each={p.stories}>
                {(story: TNews, i) => (
                    <News
                        no={(p.total || 30) * ((p.page || 1) - 1) + i() + 1}
                        _id={story._id}
                        title={story.title}
                        url={story.url}
                        domain={story.domain}
                        points={story.points}
                        user={story.user}
                        comments_count={story.comments_count}
                        type={story.type}
                        created_at={story.created_at}
                        deleted_at={story.deleted_at}
                        updated_at={story.updated_at}
                    />
                )}
            </For>
        </div>
    );
};

const More = (p: { href: string; label?: string }) => {
    return (
        <div class="flex justify-end">
            <A href={p.href} class="px-1 underline">
                {p.label || "More"}
            </A>
        </div>
    );
};

const NoStories = () => {
    return <div class="py-5 text-center text-lg text-red-500">There is no stories</div>;
};

const Newses = (p: { loading: boolean; stories: TNews[]; page: number; more_page_prefix?: string }) => {
    return (
        <div class="flex flex-col gap-3">
            <Suspense fallback={<Loading message="Suspense loading in Newses ..." />}>
                <Show when={!p.loading} fallback={<Loading message="Show loading in Newses ..." />}>
                    <Show when={p.stories.length !== 0} fallback={<NoStories />}>
                        <NewsesList stories={p.stories} page={p.page || 1} total={story_per_page} />
                        <div class="flex justify-end">
                            <Show when={p.page - 1}>
                                <More label="Less" href={`${p.more_page_prefix || "/?"}page=${p.page - 1}`} />
                            </Show>
                            <Show when={p.stories.length === story_per_page}>
                                <More href={`${p.more_page_prefix || "/?"}page=${p.page + 1}`} />
                            </Show>
                        </div>
                    </Show>
                </Show>
            </Suspense>
        </div>
    );
};

export default Newses;
