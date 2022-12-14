import axios from "axios";
import { getCookieToken } from "storage/Cookie";

const ACCESS_TOKEN = getCookieToken("access_token");

const api = axios.create({
	baseURL: "http://13.125.250.180",
	headers: {
		"content-type": "application/json;charset=UTF-8",
		accept: "application/json,",
	},
	withCredentials: true,
});

api.interceptors.request.use(function (config) {
	config.headers.common["Authorization"] = ACCESS_TOKEN;
	return config;
});

export const apis = {
	// member
	signup: (username, password, passwordConfirm, nickname) =>
		api.post("/member/signup", {
			username: username,
			password: password,
			passwordConfirm: passwordConfirm,
			nickname: nickname,
		}),
	login: (username, password) =>
		api.post("/member/login", {
			username: username,
			password: password,
		}),
	getAccessToken: (accessToken) =>
		api.post("/auth/member/reissue", {
			Authorization: `${accessToken}`,
		}),

	// interview
	getTopic: (topic) => api.get(`/interview?topic=${topic}`),
	getSubTopic: (topic) => api.get(`/interview/start?subtopic=${topic}`),
	myAnswer: (interviewid, ACCESS_TOKEN, content, publicTF) =>
		api.post(`/auth/interview/${interviewid}/myanswer`, {
			Authorization: ACCESS_TOKEN,
			content: content,
			publicTF: publicTF,
		}),
	anotherAnswer: (interviewid) => api.get(`/interview/${interviewid}/answers`),

	// like
	like: (interviewid, ACCESS_TOKEN) =>
		api.post(`/auth/interview/${interviewid}/like`, {
			Authorization: ACCESS_TOKEN,
		}),

	// mypage
	myList: (ACCESS_TOKEN) =>
		api.get("/auth/interview/mypage", {
			Authorization: ACCESS_TOKEN,
		}),
	private: (interviewid, ACCESS_TOKEN) => {
		api.put(`/auth/interview/mypage/${interviewid}`, {
			Authorization: ACCESS_TOKEN,
		});
	},
};
