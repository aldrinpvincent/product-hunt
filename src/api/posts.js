import axios from "axios";

const getPosts = async date => {
  let url = !date
    ? `https://api.producthunt.com/v1/posts`
    : `https://api.producthunt.com/v1/posts?day=${date}`;

  try {
    const postsResponse = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer 96f7a2e0834361d6d901e4b156fa5829da97fa5227856382348cc8d7df9aa9e0 "
      }
    });
    const postsData = await postsResponse.data;
    const postsList = await processPostsData(postsData.posts);
    return postsList;
  } catch (e) {
    console.error("Looks like there was a problem on getting Posts. " + e);
  }
};

const processPostsData = posts => {
  let postList = {};

  posts.forEach(item => {
    postList[item.id] = {
      name: item.name,
      tagline: item.tagline,
      image_url: item.thumbnail && item.thumbnail.image_url,
      catogory: item.topics[0] && item.topics[0].name
    };
  });

  // console.log("postList1 :", postList);

  // let postsList = [];

  // postsList = posts.map(item => {
  //   return {
  //     id: item.id,
  //     name: item.name,
  //     tagline: item.tagline,
  //     image_url: item.thumbnail && item.thumbnail.image_url,
  //     catogory: item.topics[0] && item.topics[0].name
  //   };
  // });

  return postList;
};

export default getPosts;
