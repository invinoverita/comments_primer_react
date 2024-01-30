import {
  Avatar,
  Box,
  Button,
  FormControl,
  Heading,
  Spinner,
  Text,
  ThemeProvider,
} from "@primer/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import csvPic from "../assets/csv.svg";
import { DownloadIcon } from "@primer/octicons-react";
import styled from "styled-components";
import { getProfileData } from "../api/requests";
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

const ResultPage = () => {
  const urlData = document.location.href.split("/");
  const shortcode = urlData[urlData.length - 2];

  const [profileData, setProfileData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const [nextId, setNextId] = useState("");
  const [payment, setPayment] = useState(false);

  useEffect(() => {
    getProfileData({
      shortcode: shortcode,
      setProfileData: setProfileData,
    });
  }, []);
  
  useEffect(() => {
    
  }, [])
  

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
            <Box
              sx={{
                display: "flex",
                p: 2,
                gap: 2,
              }}
            >
              <img src={csvPic} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Text
                  sx={{
                    color: "#FAFAFA",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "120%",
                  }}
                >
                  Приложенный документ c небольшим названием
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
            <StyledButton leadingVisual={DownloadIcon}>
              <Text sx={{ ml: 2 }}>Скачать</Text>
            </StyledButton>
          </Box>
          <Box
            sx={{
              maxWidth: "480px",
              width: "100%",
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
              </>
            ) : (
              <>
                <Spinner sx={{ color: "white", mx: "auto" }} />
              </>
            )}
          </Box>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default ResultPage;
