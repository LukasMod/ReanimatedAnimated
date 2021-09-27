import { stories } from "./Snapchat"

export const assets = stories.map((story) => [story.avatar, story.source]).flat()
