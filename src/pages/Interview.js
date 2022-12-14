import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteTopic } from "redux/topicSlice";
import { getCookieToken } from "storage/Cookie";
import { apis } from "api/api";

import { AnotherAnswerModal } from "components/Modal/Modal";
import Layout from "components/Layout/Layout";
import Button from "components/Button/Button";
import Timer from "components/Timer/Timer";
import Modal from "components/Modal/Modal";
import Login from "components/Auth/Login";
import Register from "components/Auth/Register";
import AnotherAnswer from "components/Answer/AnotherAnswer";
import Like from "components/Like/Like";

function Interview() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const interviewList = useSelector((state) => state.topic.list);
	const ACCESS_TOKEN = getCookieToken("access_token");

	const [loginModal, setLoginModal] = useState(false);
	const [registerModal, setRegisterModal] = useState(false);
	const [checkAnswer, setCheckAnswer] = useState(true);
	const [myAnser, setMyAnswer] = useState("");

	const [checkAnotherAnswer, setCheckAnotherAnswer] = useState(true);
	const [AnotherModalVisible, setAnotherModalVisible] = useState(false);

	const [anotherAnswer, setAnotherAnswer] = useState();

	const onChange = (e) => {
		setMyAnswer(e.target.value);
	};
	const openLoginModal = () => {
		setLoginModal(!loginModal);
	};

	const openRegisterModal = () => {
		setRegisterModal(!registerModal);
	};
	const openCheckAnotherAnswer = () => {
		setAnotherModalVisible(!AnotherModalVisible);
	};
	return (
		<>
			<Layout>
				<div className="flex items-center h-full">
					<div className="flex flex-col items-center gap-3 w-full h-5/6 rounded-2xl border-2 border-[#3D6AFE] shadow-2xl">
						{checkAnswer ? (
							<>
								{interviewList[0] && (
									<>
										<Timer />
										<div className="mt-10 text-3xl font-bold">
											{interviewList[0].question}
										</div>
										<div className="mt-5 text-xl font-bold text-[#4593FC]">
											????????? ???????????? ??? ????????????{" "}
										</div>
										<input
											onChange={onChange}
											className="w-8/12 p-4 m-4 border-2 shadow-xl h-2/4 rounded-3xl"
										/>
										<div className="fixed flex justify-center w-full gap-40 bottom-28">
											<Button
												onClick={() => {
													if (ACCESS_TOKEN !== "undefined" && ACCESS_TOKEN) {
														apis
															.myAnswer(
																interviewList[0].id,
																ACCESS_TOKEN,
																myAnser, // ?????? input value??? ?????????
																false
															)
															.then(alert("????????? ??????????????????."));
													} else {
														openLoginModal();
													}
												}}
											>
												????????????
											</Button>
											<Button
												onClick={() => {
													setCheckAnswer(!checkAnswer);
												}}
											>
												????????????
											</Button>
										</div>
									</>
								)}
							</>
						) : (
							<>
								<Like id={interviewList[0].id} ACCESS_TOKEN={ACCESS_TOKEN} />
								<div className="mt-32 text-3xl font-bold text-[#4593FC]">
									?????? ??????
								</div>
								<div className="p-4 m-20 text-lg border-2 shadow-md rounded-3xl">
									{" "}
									{interviewList[0].answer}{" "}
								</div>
								<div className="fixed flex justify-center w-full gap-40 bottom-28">
									<Button
										onClick={() => {
											navigate("/ending");
										}}
									>
										?????? ??????
									</Button>
									<Button
										onClick={() => {
											apis
												.anotherAnswer(interviewList[0].id)
												.then((response) =>
													setAnotherAnswer(response.data.data)
												);
											openCheckAnotherAnswer();
										}}
									>
										?????? ????????? ??? ?????? ??????
									</Button>
									<Button
										onClick={() => {
											setCheckAnswer(!checkAnswer);
											dispatch(deleteTopic(interviewList));
											if (interviewList.length == 1) {
												alert("????????? ??? ???????????????.");
												navigate("/ending");
											}
										}}
									>
										?????? ??????
									</Button>
								</div>
							</>
						)}
					</div>
				</div>
			</Layout>
			{loginModal && (
				<Modal
					visible={loginModal}
					closable={true}
					maskClosable={true}
					onClose={openLoginModal}
				>
					<Login onClose={openLoginModal} />
					<div
						className="mt-8 text-center text-gray-500 cursor-pointer "
						onClick={() => {
							setRegisterModal(!registerModal);
							setLoginModal(!loginModal);
						}}
					>
						????????? ???????????????? Click
					</div>
				</Modal>
			)}
			{registerModal && (
				<Modal
					visible={registerModal}
					closable={true}
					maskClosable={true}
					onClose={openRegisterModal}
				>
					<Register />
				</Modal>
			)}
			{checkAnotherAnswer && (
				<AnotherAnswerModal
					visible={AnotherModalVisible}
					closable={true}
					maskClosable={true}
					onClose={openCheckAnotherAnswer}
				>
					<AnotherAnswer anotherAnswer={anotherAnswer} />
				</AnotherAnswerModal>
			)}
		</>
	);
}

export default Interview;
