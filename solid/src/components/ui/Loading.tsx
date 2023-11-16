const Loading = (p: { message?: string }) => {
    return <p>{p.message || "Loading..."}</p>;
};

export default Loading;
