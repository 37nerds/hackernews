import type { TStory, TStoryType } from "@/queries/stories";

import { createVoteMutation } from "@/queries/stories";
import { For, Show, Suspense, createEffect } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { createAddHideMutation, createGetPathname } from "@/queries/users";
import { useIsUserLoggedIn, useLoggedUser } from "@/contexts/logged_user";

import { display_from_now } from "@/helpers/time";
import { story_per_page } from "@/config/misc";

import Triangle from "@/components/icons/Triangle";
import Loading from "@/components/ui/Loading";

const is_link = (type: TStoryType) => type === "link";
const is_show = (type: TStoryType) => type === "show";
const is_job = (type: TStoryType) => type === "job";

const Unvote = (p: { id: string }) => {
    const vote_mutation = createVoteMutation();
    const logged_user = useLoggedUser();

    return (
        <Show when={logged_user?.data()?.voted_story?.find(story_id => p.id === story_id)}>
            |{" "}
            <button
                onClick={() => {
                    vote_mutation.mutate({ story_id: p.id, operation: "remove" });
                }}
                disabled={vote_mutation.isPending}
                class="hover:underline"
            >
                unvote
            </button>
        </Show>
    );
};

const Vote = (p: { id: string }) => {
    const navigate = useNavigate();
    const isUserLoggedIn = useIsUserLoggedIn();
    const voteMutation = createVoteMutation();
    const loggedUser = useLoggedUser();

    const handleClick = () => {
        if (!isUserLoggedIn) {
            navigate("/login");
            return;
        }
        voteMutation.mutate({ story_id: p.id, operation: "add" });
    };

    return (
        <div class="h-3 w-3">
            <Show when={!loggedUser?.data()?.voted_story?.find(story_id => story_id === p.id)}>
                <button class="items-top flex h-3 w-3" onClick={handleClick}>
                    <Triangle />
                </button>
            </Show>
        </div>
    );
};

const Hide = (p: { id: string }) => {
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
        mutate()({ story_id: p.id, operation: pathname() === "/hidden" ? "remove" : "add" });
    };

    return (
        <>
            <span> | </span>
            <button onClick={handleClick} disabled={loading()} class="hover:underline">
                {pathname() === "/hidden" ? "un-hide" : "hide"}
            </button>
        </>
    );
};

const Comments = (p: { id: string; count: number }) => {
    return (
        <>
            <span> | </span>
            <A href={`/item?id=${p.id}`} class="hover:underline">
                <Show when={p?.count || 0 > 0} fallback="discuss">
                    {p.count} comments
                </Show>
            </A>
        </>
    );
};

const Time = (p: { id: string; created_at: string }) => {
    return (
        <>
            <A title={new Date(p.created_at).toUTCString()} href={`/item?id=${p.id}`} class="hover:underline">
                {display_from_now(p.created_at)}
            </A>
        </>
    );
};

const PointsUser = (p: { user: string | null; points: number }) => {
    return (
        <>
            <span> {p.points} points by </span>
            <A href={`/user/${p.user}`} class="hover:underline">
                {p.user}
            </A>
            <span> | </span>
        </>
    );
};

const Story = (p: TStory & { no: number }) => {
    const m: Record<string, string> = { ask: "ASK: ", job: "JOB: ", show: "SHOW: " };
    const title_prefix = () => m[p.type] || "";
    return (
        <div class="flex gap-1 rounded bg-primary-bg px-1 py-0.5">
            <Show when={!is_job(p.type)}>
                <div class="items-top flex gap-1">
                    <div class="min-w-5 text-end text-secondary">{p.no}.</div>
                    <Vote id={p._id} />
                </div>
            </Show>
            <div class="flex flex-col">
                <div class="flex items-center gap-1">
                    <A
                        href={is_link(p.type) || is_show(p.type) ? p.url : `/item?id=${p._id}`}
                        target="_blank"
                        class="text-primay text-sm"
                    >
                        {title_prefix()}
                        {p.title}
                    </A>
                    <Show when={is_link(p.type) || is_show(p.type)}>
                        <A href={`/from?site=${p.domain}`} class="text-[11px] text-secondary hover:underline">
                            ({p.domain})
                        </A>
                    </Show>
                </div>
                <div class="text-[11px] text-secondary">
                    <Show when={!is_job(p.type)}>
                        <PointsUser user={p.user} points={p.points || 0} />
                    </Show>
                    <Time id={p._id} created_at={p.created_at} />
                    <Show when={!is_job(p.type)}>
                        <Unvote id={p._id} />
                        <Hide id={p._id} />
                        <Comments id={p._id} count={p.comments_count} />
                    </Show>
                </div>
            </div>
        </div>
    );
};

const List = (p: { stories: TStory[]; page?: number; total?: number }) => {
    return (
        <div class="flex flex-col gap-1">
            <For each={p.stories}>
                {(story: TStory, i) => (
                    <Story
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

const Stories = (p: { loading: boolean; stories: TStory[]; page: number; more_page_prefix?: string }) => {
    return (
        <div class="flex flex-col gap-3">
            <Suspense fallback={<Loading message="Suspense loading in Newses ..." />}>
                <Show when={!p.loading} fallback={<Loading message="Show loading in Newses ..." />}>
                    <Show when={p.stories.length !== 0} fallback={<NoStories />}>
                        <List stories={p.stories} page={p.page || 1} total={story_per_page} />
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

export default Stories;
