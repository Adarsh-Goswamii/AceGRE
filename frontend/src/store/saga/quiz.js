import * as actionType from "../actionType/index";
import { put, call, takeLatest, all } from "redux-saga/effects";
import * as api from "../../apis/quiz";

function* handleGenerateQuiz(action) {
  try {
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY,
      payload: true,
    });
    const results = yield call(api.generateQuiz);
    yield put({
      type: actionType.GENERATE_QUIZ_SUCCESS,
      payload: results?.data?.quiz_id
    });
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY,
      payload: false
    });
    yield put({
      type: actionType.GENERATE_QUIZ_FAILURE,
      payload: error.response.data
    });
  }
}

function* handleQuizQuesFetch(action) {
  try {
    const { payload } = action;
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY,
      payload: true,
    });
    const results = yield call(api.fetchQuestions, payload);
    yield put({
      type: actionType.GENERATE_QUIZ_SUCCESS,
      payload: results?.data?.data
    });
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY,
      payload: false
    });
    yield put({
      type: actionType.GET_QUIZ_QUESTIONS_FAILURE,
      payload: error.response.data
    });
  }
}

function* handlePatchSolution(action) {
  try {
    const { payload } = action;
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY,
      payload: true,
    });
    const results = yield call(api.patchSolution, payload);
    yield put({
      type: actionType.PATCH_QUIZ_SOLUTION_SUCCESS,
      payload: results?.data
    });
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY,
      payload: false
    });
    yield put({
      type: actionType.PATCH_QUIZ_SOLUTION_FAILURE,
      payload: error.response.data
    });
  }
}


function* generateQuizWatcher() {
  yield takeLatest(actionType.GENERATE_QUIZ, handleGenerateQuiz);
}

function* fetchQuizQuestionsWatcher() {
  yield takeLatest(actionType.GET_QUIZ_QUESTIONS, handleQuizQuesFetch);
}

function* patchQuizSolutionWatcher() {
  yield takeLatest(actionType.PATCH_QUIZ_SOLUTION, handlePatchSolution);
}

export function* quizSaga() {
  yield all([
    generateQuizWatcher(),
    fetchQuizQuestionsWatcher(),
    patchQuizSolutionWatcher(),
  ]);
};