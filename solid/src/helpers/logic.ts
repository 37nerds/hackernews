import { TNews } from "@/queries/newses";

export const filter_hidden_newses = (newses: TNews[], hidden_news: string[]) => {
    return newses.filter(news => !hidden_news.find(id => news._id === id));
};
