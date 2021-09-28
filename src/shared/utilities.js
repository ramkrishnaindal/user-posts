export const encodeStr = (rawStr) =>
  rawStr.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
    return "&#" + i.charCodeAt(0) + ";";
  });

export const decodeStr = (rawStr) => {
  var e = document.createElement("textarea");
  e.innerHTML = rawStr;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

export const getUserCategories = (catIDs, categories) => {
  const IDs = catIDs.map((cat) => cat.id);
  return categories.filter((cat) => IDs.includes(cat.id));
};
export const getUniqueTags = (id, posts) => {
  debugger;
  const tagsToDelete = [];
  const otherPosts = posts.filter((post) => post.id != id);

  const post = posts.find((post) => post.id == id);
  if (otherPosts.length == 0) return post.tags;
  if (post && post.tags && post.tags.length > 0) {
    post.tags.forEach((tag) => {
      let isUnique = true;
      otherPosts.forEach((otherPost) => {
        const IDs = otherPost.tags.map((cat) => cat.id);
        isUnique = isUnique && !IDs.includes(tag.id);
        if (!isUnique) return;
      });
      if (isUnique) tagsToDelete.push(tag);
    });
  }

  return tagsToDelete;
};
