export const POST_QUESTIONS = 'POST_QUESTIONS';
export const postQuestions = (values) => dispatch => {
  return fetch('/api/ladydevs', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(values)
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  }).then(res => {
    dispatch(postQuestionsSuccess(values));
  });
};

export const POST_QUESTIONS_SUCCESS = 'POST_QUESTIONS_SUCCESS';
export const postQuestionsSuccess = (values) => ({
  type: POST_QUESTIONS_SUCCESS,
  values
});
