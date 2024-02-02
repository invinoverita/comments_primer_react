import {
  Avatar,
  Box,
  Button,
  FormControl,
  Heading,
  ProgressBar,
  Spinner,
  Text,
  TextInput,
  ThemeProvider,
} from "@primer/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import csvPic from "../assets/csv.svg";
import { DownloadIcon } from "@primer/octicons-react";
import styled from "styled-components";
import { checkPayment, getCsvComments, getProfileData } from "../api/requests";
import ProfileInfo from "../components/PreviewPage/ProfileInfo";

const StyledButton = styled(Button)`
  width: fit-content;
  margin-top: 16px;
  padding: 12px 20px;
  background: #0078d2;
  color: #fafafa;
  font-weight: normal;
  &:hover {
    color: #0078d2;
  }
`;

const StyledRandomButton = styled(Button)`
  width: fit-content;
  margin-top: 16px;
  padding: 12px 20px;
  background: transparent;
  border: 1px solid #0078d2;
  border-radius: 6px;
  color: #0f9fff;
  font-weight: normal;
  &:hover {
    color: #0078d2;
  }
`;

const StyledTextInput = styled(TextInput)`
  background: #22272b;
  width: 100%;
  border-color: #f6fbfd47;
  font-size: 2;
  color: white;
  input {
    padding-left: 10px;
  }
`;

const ResultPage = () => {
  const urlData = document.location.href.split("/");
  const params = new URLSearchParams(document.location.search);
  const email = params.get("email");
  const quantity = params.get("quantity");
  const filter_user_info = params.get("filter_user_info");
  const shortcode = urlData[urlData.length - 2];

  const [winnerArray, setWinnerArray] = useState([]);
  const [winnerAmmount, setWinnerAmmount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [commentsData, setCommentsData] = useState("");
  const [payment, setPayment] = useState(false);
  const serverRequests = async () => {
    await checkPayment({
      payment: payment,
      email: email,
      setPayment: setPayment,
    });
    await getProfileData({
      shortcode: shortcode,
      setProfileData: setProfileData,
    });
  };
  const downloadCSV = () => {
    let blob = new Blob([commentsData], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, "data.csv");
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "сomments.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  useEffect(() => {
    serverRequests();
  }, []);
  useEffect(() => {
    if (payment) {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 1;
        setProgress(currentProgress);
        if (currentProgress >= 90) {
          clearInterval(interval);
        }
      }, 200);
      getCsvComments({
        setProgress: setProgress,
        email: email,
        filter_user_info: false,
        quantity: 50,
        setCommentsData: setCommentsData,
        shortcode: shortcode,
      });
    }
  }, [payment]);

  // const getRandomComment = (count) => {
  //   setWinnerArray([]);
  //   let commentsRows = commentsData.split("\n");
  //   commentsRows.shift();
  //   let comments = commentsRows.map((row) => {
  //     const [username, text, date, like] = row.split(",");
  //     return { username, text, date, like };
  //   });
  //   for (let i = 0; i < count; i++) {
  //     const randomComment =
  //       comments[Math.floor(Math.random() * comments.length)];
  //     setWinnerArray((prevState) => [...prevState, randomComment]);
  //     console.log(randomComment);
  //   }
  // };

  const getRandomComment = ({ str, count }) => {
    setWinnerArray([]);
    const arr = [];
    let quote = false;
    for (let row = 0, col = 0, c = 0; c < str.length; c++) {
      let cc = str[c],
        nc = str[c + 1];
      arr[row] = arr[row] || [];
      arr[row][col] = arr[row][col] || "";
      if (cc == '"' && quote && nc == '"') {
        arr[row][col] += cc;
        ++c;
        continue;
      }
      if (cc == '"') {
        quote = !quote;
        continue;
      }
      if (cc == "," && !quote) {
        ++col;
        continue;
      }
      if (cc == "\r" && nc == "\n" && !quote) {
        ++row;
        col = 0;
        ++c;
        continue;
      }
      if (cc == "\n" && !quote) {
        ++row;
        col = 0;
        continue;
      }
      if (cc == "\r" && !quote) {
        ++row;
        col = 0;
        continue;
      }
      arr[row][col] += cc;
    }
    arr.shift();
    console.log(arr);
    for (let i = 0; i < count; i++) {
      const randomComment = arr[Math.floor(Math.random() * arr.length)];
      setWinnerArray((prevState) => [...prevState, randomComment]);
      console.log(randomComment);
    }
    return arr;
  };

  return (
    <ThemeProvider>
      <Box
        sx={{
          height: "100%",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "normal",
        }}
      >
        <Header />
        {payment ? (
          <>
            <Box
              sx={{
                color: "#fafafa",
                py: 4,
                flexGrow: 1,
                display: "flex",
                gap: "32px",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  maxWidth: "480px",
                  width: "100%",
                  height: "fit-content",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.20)",
                  background: "#161A1D",
                  backdropFilter: "blur(50px)",
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <Heading
                  sx={{
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: "150%",
                  }}
                >
                  Комментарии
                </Heading>
                {commentsData ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        p: 2,
                        gap: 2,
                      }}
                    >
                      <img src={csvPic} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Text
                          sx={{
                            color: "#FAFAFA",
                            fontSize: "14px",
                            fontWeight: "400",
                            lineHeight: "120%",
                          }}
                        >
                          сomments.csv
                        </Text>
                        <Text
                          sx={{
                            color: "rgba(255, 255, 255, 0.30)",
                            fontSize: "14px",
                            fontWeight: "400",
                            lineHeight: "120%",
                          }}
                        >
                          1,5 Mб 21.02.2019, 14:12
                        </Text>
                      </Box>
                    </Box>
                    <StyledButton
                      leadingVisual={DownloadIcon}
                      onClick={() => downloadCSV()}
                    >
                      <Text sx={{ ml: 2 }}>Скачать</Text>
                    </StyledButton>
                  </>
                ) : (
                  <>
                    <ProgressBar bg="#0078D2" animated progress={progress} />
                  </>
                )}
              </Box>
              <Box
                sx={{
                  maxWidth: "480px",
                  width: "100%",
                  height: "fit-content",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.20)",
                  background: "#161A1D",
                  backdropFilter: "blur(50px)",
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {profileData ? (
                  <>
                    <ProfileInfo data={profileData} />
                    {commentsData ? (
                      <>
                        <FormControl>
                          <FormControl.Label
                            sx={{
                              fontWeight: 400,
                              lineHeight: "150%",
                              fontSize: 2,
                              color: "rgba(255, 255, 255, 0.60)",
                            }}
                          >
                            Количество победителей
                          </FormControl.Label>
                          <StyledTextInput
                            type="number"
                            min="0"
                            placeholder="Введите число"
                            required
                            value={winnerAmmount}
                            onChange={(e) => setWinnerAmmount(e.target.value)}
                          />
                          <StyledRandomButton
                            onClick={() => {
                              getRandomComment({
                                str: commentsData,
                                count: winnerAmmount,
                              });
                            }}
                          >
                            Определить
                          </StyledRandomButton>
                        </FormControl>
                        {winnerArray.length > 0 ? (
                          <>
                            <Heading
                              sx={{
                                fontSize: "18px",
                                fontWeight: "700",
                                lineHeight: "150%",
                              }}
                            >
                              Победители!
                            </Heading>
                            {winnerArray.map((i) => {
                              return <Text>@{i[0]}</Text>;
                            })}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        <Spinner sx={{ color: "white", mx: "auto" }} />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Spinner sx={{ color: "white", mx: "auto" }} />
                  </>
                )}
              </Box>
            </Box>
            <Footer />
          </>
        ) : (
          <>
            <Spinner sx={{ color: "white", mx: "auto", py: 3 }} />
            <Text
              sx={{
                color: "white",
                mx: "auto",
                fontWeight: "bold",
              }}
            >
              Ожидаем подтверждение оплаты...
            </Text>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ResultPage;
