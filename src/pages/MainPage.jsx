import React, { useState } from "react";
import {
  BaseStyles,
  Box,
  Button,
  Details,
  FormControl,
  Heading,
  Label,
  PageLayout,
  SegmentedControl,
  SplitPageLayout,
  Text,
  TextInput,
  ThemeProvider,
  theme,
} from "@primer/react";
import deepmerge from "deepmerge";
import Header from "../components/Header";
import bgImage from "../assets/bg.svg";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { commentsBase } from "../../../comments_react/src/api/client";

const StyledButton = styled(Button)`
  margin-top: 16px;
  background: #0078d2;
  color: #fafafa;
  font-weight: normal;
  &:hover {
    color: #0078d2;
  }
`;
const StyledSegmentedControl = styled(SegmentedControl)`
  background: transparent;
  margin-top: 16px;
  border: 1px solid rgba(246, 251, 253, 0.28);
  width: fit-content;
  li {
    flex-grow: 0;
    height: 100%;
    button {
      height: 100%;
      &[aria-current="true"] {
        background: rgba(250, 250, 250, 0.16) !important;
        color: black;
      }
      &[aria-current="false"] {
      }
    }
  }
`;
const MainPage = () => {
  const [postUrl, setPostUrl] = useState("");
  const navigate = useNavigate();
  const navigateToMain = ({ shortcodeData, commentsIdData }) => {
    navigate(`/payment/${shortcodeData}/${commentsIdData}`);
  };
  const getCommentsId = async () => {
    const postUrlArray = postUrl.split("/");
    const shortcode = postUrlArray[postUrlArray.length - 2];
    await commentsBase
      .get(`/${shortcode}/id`)
      .then((response) => {
        console.log(shortcode);
        console.log(response.data.id);
        navigateToMain({
          shortcodeData: shortcode,
          commentsIdData: response.data.id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <ThemeProvider>
        <Box
          sx={{
            height: "100%",
            minHeight: "100vh",
            width: "100%",
            background: `url(${bgImage}) top center no-repeat, #0c0e0f`,
            display: "flex",
            flexDirection: "column",
            fontFamily: "normal",
          }}
        >
          <Header />
          <Box
            flexGrow={"1"}
            sx={{
              width: "100%",
              maxWidth: "650px",
              margin: "96px auto",
              color: "#fafafa",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Heading as="h2">Скачивайте комментарии из Instagram</Heading>
              <Text sx={{ fontSize: 3, marginTop: "24px", lineHeight: "150%" }}>
                Извлекайте данные о комментариях, контактную информацию и
                определяйте победителей, используя наш сервис GetComments.
                Получайте эксель таблицы с датой и временем, пользователем,
                текстом и количеством лайков для каждого комментария, а также
                доступ к контактной информации, такой как телефон и почта.
              </Text>
            </Box>
            <Box
              sx={{
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.20)",
                background: "rgba(246, 251, 253, 0.10)",
                backdropFilter: "blur(50px)",
                p: 4,
                mt: 10,
              }}
              as="form"
              onSubmit={(e) => {
                e.preventDefault();
                getCommentsId();
              }}
              aria-label="Instagram URL"
            >
              <FormControl required="true">
                <FormControl.Label
                  children="Ссылка на публикацию в Instagram"
                  sx={{
                    fontSize: 2,
                    fontWeight: "normal",
                    color: "rgba(255, 255, 255, 0.60)",
                    lineHeight: "150%",
                  }}
                />
                <TextInput
                  placeholder="https://www.instagram.com/p/AbCdeFghGjk"
                  sx={{
                    bg: "#22272B",
                    width: "100%",
                    borderColor: "#F6FBFD47",
                    fontSize: 2,
                    color: "white",
                  }}
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                />
                <StyledButton type="submit">Загрузить комментарии</StyledButton>
              </FormControl>
            </Box>
            <Box
              sx={{
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.20)",
                background: "#161A1D",
                backdropFilter: "blur(50px)",
                p: 4,
                mt: 10,
              }}
            >
              <Details
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text
                  as="summary"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  Как получить ссылку на пост в Instagram
                </Text>
                <StyledSegmentedControl>
                  <StyledSegmentedControl.Button>
                    В веб версии
                  </StyledSegmentedControl.Button>
                  <StyledSegmentedControl.Button>
                    В приложении
                  </StyledSegmentedControl.Button>
                </StyledSegmentedControl>
                <Text
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "rgba(255, 255, 255, 0.60)",
                    mt: 4,
                  }}
                >
                  Извлекайте данные о комментариях, контактную информацию и
                  определяйте победителей, используя наш сервис GetComments.
                  Получайте эксель таблицы с датой и временем, пользователем,
                  текстом и количеством лайков для каждого комментария, а также
                  доступ к контактной информации, такой как телефон и почта.
                </Text>
              </Details>
              <Details
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: 4,
                }}
              >
                <Text
                  as="summary"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  Вопрос №2
                </Text>
              </Details>
              <Details
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: 4,
                }}
              >
                <Text
                  as="summary"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  Вопрос №3
                </Text>
              </Details>
            </Box>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default MainPage;
