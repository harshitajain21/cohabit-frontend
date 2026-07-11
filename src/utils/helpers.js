export const initials=name=>name?.split(" ").map(word=>word[0]).slice(0,2).join("").toUpperCase()||"?";
