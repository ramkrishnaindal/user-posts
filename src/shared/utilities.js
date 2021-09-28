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
  const IDs=catIDs.map(cat=>cat.id)
  return categories.filter((cat) => IDs.includes(cat.id));
};
export const getUniqueTags = (id, posts) => {
  debugger
  let tagsToDelete =[]
  const otherPosts = posts.filter((post) => post.id != id);
  const post = posts.find((post) => post.id == id);
  if(otherPosts.length==0)
    return post.tags;
  const IDs=otherPosts.tags.map(cat=>cat.id)
  
  if (post && post.tags && post.tags.length > 0) {
    tagsToDelete =post.tags.filter(tag=>!IDs.includes(tag.id))
  }
  return tagsToDelete;
};
