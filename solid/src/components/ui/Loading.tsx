const Loading = (p: { message?: string }) => {
    return <p class="text-center">{p.message || "Loading..."}</p>;
};

export default Loading;
