import Container from "../ui/Container";

export default () => {
    return (
        <Container>
            <nav class="flex items-center justify-between bg-[#ff6600] px-1 py-0.5 text-white">
                <div class="flex items-center gap-2">
                    <a href="/" class="font-bold">
                        Hacker News
                    </a>
                    <span>|</span>
                    <a href="/newswelcome">welcome</a>
                    <span>|</span>
                    <a href="/newest">new</a>
                    <span>|</span>
                    <a href="/threads?id=p-nerd">threads</a>
                    <span>|</span>
                    <a href="/front">past</a>
                    <span>|</span>
                    <a href="/front">past</a>
                    <span>|</span>
                    <a href="/newscomments">comments</a>
                    <span>|</span>
                    <a href="/ask">ask</a>
                    <span>|</span>
                    <a href="/show">show</a>
                    <span>|</span>
                    <a href="/jobs">jobs</a>
                    <span>|</span>
                    <a href="/submit">submit</a>
                </div>
                <div class="flex items-center gap-2">
                    <a href="/user?id=p-nerd">p-nerd(1)</a>
                    <span>|</span>
                    <a href="/logout">logout</a>
                </div>
            </nav>
        </Container>
    );
};
