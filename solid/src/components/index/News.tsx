export default (p: { title: string; no: number }) => {
    return (
        <div class="bg-[#f6f6ef] px-1 py-0.5">
            <div class="flex gap-1">
                <div>{p.no}.</div>
                <div>{p.title}</div>
            </div>
        </div>
    );
};
