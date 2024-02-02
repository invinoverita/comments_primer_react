import { BASE_URL, CLIENT_URL, commentsBase, paymentBase } from "./client";

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

export const getCommentsData = async ({ minId, commentsId, setNextId, setCommentsData, commentsData }) => {
  try {
    let response = await commentsBase.get(
      `${commentsId}/${minId ? `?min_id=${JSON.stringify(minId)}` : ""}`
    );
    console.log(response);
    const newComments = response.data.response.body.comments.filter(
      (comment) =>
        !commentsData.some(
          (existingComment) => existingComment.pk === comment.pk
        )
    );
    setNextId(response.data.response.body.next_min_id);
    setCommentsData((prevData) => [
      ...prevData,
      ...newComments,
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const getPayment = async ({ shortcode, payment, additional, email }) => {
  const successUrl = encodeURIComponent(
    `${CLIENT_URL}result/${shortcode}/?quantity=${payment}&filter_user_info=${additional}&email=${email}`
  );
  await paymentBase
    .get(
      `/process?success_url=${successUrl}&canceled_url=${document.location.href}&quantity=${payment}&filter_user_info=${additional}`
    )
    .then((response) => {
      document.location.href = `${BASE_URL}api/payment/process?success_url=${successUrl}&canceled_url=${document.location.href}&quantity=${payment}&filter_user_info=${additional}`;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const checkPayment = async ({ payment, setPayment, email }) => {
  if (payment) {
    return;
  }
  await paymentBase
    .get(`/check/?email=${email}`)
    .then((response) => {
      if (response.data.status || response.data.error) {
        setPayment(true)
      } else {
        setPayment(false)
      }
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

export const getCsvComments = async ({ shortcode, quantity, filter_user_info, email, setCommentsData, setProgress }) => {
  await commentsBase
    .get(`/csv_file?shortcode=${shortcode}&quantity=${quantity}&filter_user_info=${filter_user_info}&email=${email}`)
    .then((response) => {
      setProgress(100)
      setCommentsData(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}