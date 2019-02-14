import axios from "axios";

const getComments = async postId => {
  let url = `https://api.producthunt.com/v1/posts/${postId}/comments`;

  try {
    const commentsResponse = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer 96f7a2e0834361d6d901e4b156fa5829da97fa5227856382348cc8d7df9aa9e0 "
      }
    });
    const commentsData = await commentsResponse.data;
    const commentsList = await processcommentsData(commentsData.comments);
    await console.log("commentsList :", commentsList);
    return commentsList;
  } catch (e) {
    console.error("Looks like there was a problem on getting comments. " + e);
  }
};

const processcommentsData = comments => {
  let commentsList = comments.map(item => {
    return {
      id: item.id,
      body: item.body,
      username: item.user.name,
      image_url: item.user.image_url["60px"]
    };
  });
  return commentsList;
};

export default getComments;
