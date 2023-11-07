import ULink from "./ULink";

const ULinks = () => {
    return (
        <div class="flex flex-col gap-1 pl-[98px]">
            <ULink label="change password" href="/change-password" />
            <ULink label="submissions" href="/submissions" />
            <ULink label="comments" href="/comments" />
            <ULink label="hidden" href="/hidden" />
            <ULink label="favorite submissions" href="/favorite-submissions" />
            <ULink label="public comments" href="/public-comments" />
        </div>
    );
};

export default ULinks;
