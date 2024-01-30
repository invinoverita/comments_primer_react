import { BASE_URL, commentsBase, paymentBase } from "./client";

export const getProfileData = async ({ setProfileData, shortcode }) => {
  await commentsBase
    .get(`${shortcode}/main`)
    .then((response) => {
      setProfileData(response.data.response.body);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCommentsData = async ({ minId, commentsId, setNextId, setCommentsData }) => {
  try {
    const response = await commentsBase.get(
      `${commentsId}/${minId ? `?min_id=${JSON.stringify(minId)}` : ""}`
    );
    // const newComments = response.data.response.body.comments.filter(
    //   (comment) =>
    //     !commentsData.some(
    //       (existingComment) => existingComment.media_id === comment.media_id
    //     )
    // );
    setNextId(response.data.response.body.next_min_id);
    setCommentsData((prevData) => [
      ...prevData,
      ...response.data.response.body.comments,
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const getPayment = async ({ shortcode, payment, additional, email }) => {
  const successUrl = encodeURIComponent(
    `http://localhost:5173/result/${shortcode}/?quantity=${payment}&filter_user_info=${additional}&email=${email}`
  );
  await paymentBase
    .get(
      `/process?success_url=${successUrl}&canceled_url=${document.location.href}&quantity=${payment}&filter_user_info=${additional}`
    )
    .then((response) => {
      console.log(response);
      document.location.href = `${BASE_URL}api/payment/process?success_url=${successUrl}&canceled_url=${document.location.href}&quantity=${payment}&filter_user_info=${additional}`;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const checkPayment = async ({ setPayment }) => {

}