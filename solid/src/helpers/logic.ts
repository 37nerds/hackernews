import { TNews } from "@/queries/stories";

export const filter_hidden_stories = (stories: TNews[], hidden_story: string[]) => {
    return stories.filter(story => !hidden_story.find(id => story._id === id));
};
