import {
  Avatar,
  Box,
  Checkbox,
  FormControl,
  PageLayout,
  ThemeProvider,
  Text,
  TextInput,
  Heading,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Button,
  Spinner,
} from "@primer/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import mailIcon from "../assets/mail_icon.svg";
import styled from "styled-components";
import Content from "../components/PreviewPage/Content";
import ProfileInfo from "../components/PreviewPage/ProfileInfo";
import { getCommentsData, getPayment, getProfileData } from "../api/requests";
import { useNavigate } from "react-router-dom";

const StyledTextInput = styled(TextInput)`
  background: url(${mailIcon}) no-repeat scroll 10px 9px, #22272b;
  width: 100%;
  border-color: #f6fbfd47;
  font-size: 2;
  color: white;
  input {
    padding-left: 35px;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
  padding: 12px 20px;
  background: #0078d2;
  color: #fafafa;
  font-weight: normal;
  &:hover {
    color: #0078d2;
  }
`;

const PaymentPage = () => {
  const urlData = document.location.href.split("/");
  const shortcode = urlData[urlData.length - 2];
  const commentsId = urlData[urlData.length - 1];

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState(0);
  const [additional, setAdditional] = useState(false);

  const [profileData, setProfileData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const [nextId, setNextId] = useState("");

  const getRequests = async () => {
    await getProfileData({
      shortcode: shortcode,
      setProfileData: setProfileData,
    });
    await getCommentsData({
      commentsId: commentsId,
      setNextId: setNextId,
      commentsData: commentsData,
      setCommentsData: setCommentsData,
    });
  };

  useEffect(() => {
    getRequests();
  }, []);

  useEffect(() => {
    console.log(commentsData);
    if (commentsData.length < 50 && commentsData.length > 0) {
      getCommentsData({
        minId: nextId,
        commentsId: commentsId,
        setNextId: setNextId,
        setCommentsData: setCommentsData,
        commentsData: commentsData,
      });
    }
  }, [commentsData]);

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
        {profileData ? (
          <>
            <PageLayout containerWidth="full">
              <PageLayout.Pane
                position={"start"}
                width={"large"}
                sx={{
                  color: "white",
                }}
              >
                <Box
                  sx={{
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
                  <ProfileInfo data={profileData} />
                  <Box
                    sx={{
                      height: "1px",
                      background: "rgba(255, 255, 255, 0.20)",
                    }}
                  />
                  {profileData.comment_count > 0 ? (
                    <>
                      <FormControl required>
                        <FormControl.Label
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "150%",
                            color: "rgba(255, 255, 255, 0.60)",
                          }}
                        >
                          Email
                        </FormControl.Label>
                        <StyledTextInput
                          placeholder="mail@domain.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <FormControl.Caption
                          sx={{ color: "rgba(255, 255, 255, 0.80)", pl: 3 }}
                        >
                          На нее пришлем файл с комментарием
                        </FormControl.Caption>
                      </FormControl>
                      <RadioGroup name="comments_ammount">
                        <RadioGroup.Label
                          sx={{
                            fontSize: "18px",
                            fontWeight: "700",
                            lineHeight: "150%",
                          }}
                        >
                          Количество
                        </RadioGroup.Label>
                        {profileData.comment_count >= 100 ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <FormControl sx={{ p: 2, alignItems: "center" }}>
                              <Radio
                                value="100"
                                checked={payment === 100}
                                onChange={() => setPayment(100)}
                              />
                              <FormControl.Label
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  lineHeight: "120%",
                                  color: "white",
                                }}
                              >
                                100 последних
                              </FormControl.Label>
                            </FormControl>
                            <Text>Бесплатно</Text>
                          </Box>
                        ) : (
                          <></>
                        )}
                        {profileData.comment_count >= 500 ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <FormControl sx={{ p: 2, alignItems: "center" }}>
                              <Radio
                                value="100"
                                checked={payment === 500}
                                onChange={() => setPayment(500)}
                              />
                              <FormControl.Label
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  lineHeight: "120%",
                                  color: "white",
                                }}
                              >
                                500 последних
                              </FormControl.Label>
                              <FormControl.Caption>
                                $0.03 / комментарий
                              </FormControl.Caption>
                            </FormControl>
                            <Text>$15.00</Text>
                          </Box>
                        ) : (
                          <></>
                        )}
                        {profileData.comment_count >= 1000 ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <FormControl sx={{ p: 2, alignItems: "center" }}>
                              <Radio
                                value="100"
                                checked={payment === 1000}
                                onChange={() => setPayment(1000)}
                              />
                              <FormControl.Label
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  lineHeight: "120%",
                                  color: "white",
                                }}
                              >
                                1000 последних
                              </FormControl.Label>
                              <FormControl.Caption>
                                $0.02 / комментарий
                              </FormControl.Caption>
                            </FormControl>
                            <Text>$20.00</Text>
                          </Box>
                        ) : (
                          <></>
                        )}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <FormControl sx={{ p: 2, alignItems: "center" }}>
                            <Radio
                              value={profileData.comment_count}
                              checked={payment === profileData.comment_count}
                              onChange={() =>
                                setPayment(profileData.comment_count)
                              }
                            />
                            <FormControl.Label
                              sx={{
                                fontSize: "16px",
                                fontWeight: "400",
                                lineHeight: "120%",
                                color: "white",
                              }}
                            >
                              Все ({profileData.comment_count} комментариев)
                            </FormControl.Label>
                            {profileData.comment_count <= 100 ? (
                              <></>
                            ) : (
                              <FormControl.Caption>
                                $0.03 / комментарий
                              </FormControl.Caption>
                            )}
                          </FormControl>
                          <Text>
                            {profileData.comment_count <= 100
                              ? "Бесплатно"
                              : `$${(profileData.comment_count * 0.03).toFixed(
                                  2
                                )}`}
                          </Text>
                        </Box>
                      </RadioGroup>
                      <CheckboxGroup>
                        <CheckboxGroup.Label
                          sx={{
                            fontSize: "18px",
                            fontWeight: "700",
                            lineHeight: "150%",
                          }}
                        >
                          Дополнительно
                        </CheckboxGroup.Label>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <FormControl sx={{ p: 2, alignItems: "center" }}>
                            <Checkbox
                              checked={additional}
                              onChange={() => setAdditional(!additional)}
                            />
                            <FormControl.Label
                              sx={{
                                fontSize: "16px",
                                fontWeight: "400",
                                lineHeight: "120%",
                                color: "white",
                              }}
                            >
                              Извлекать контактную информацию с комментаторов
                            </FormControl.Label>
                            <FormControl.Caption>
                              $0.01 / комментарий
                            </FormControl.Caption>
                          </FormControl>
                          <Text>{`$${(profileData.comment_count * 0.01).toFixed(
                            2
                          )}`}</Text>
                        </Box>
                      </CheckboxGroup>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Heading
                          sx={{
                            fontSize: "18px",
                            fontWeight: "700",
                            lineHeight: "150%",
                          }}
                        >
                          Итого
                        </Heading>
                        <Heading
                          sx={{
                            fontSize: "18px",
                            fontWeight: "700",
                            lineHeight: "150%",
                          }}
                        >
                          {payment > 100 || additional
                            ? `$${
                                additional
                                  ? 0.03 * payment + 0.01 * payment
                                  : 0.03 * payment
                              }`
                            : "Бесплатно"}
                        </Heading>
                      </Box>
                      <StyledButton
                        onClick={
                          payment <= 100
                            ? () => {
                                navigate(
                                  `/result/${shortcode}/?quantity=${payment}&filter_user_info=${additional}&email=${email}`
                                );
                              }
                            : () =>
                                getPayment({
                                  additional: additional,
                                  email: email,
                                  payment: payment,
                                  shortcode: shortcode,
                                })
                        }
                        sx={{ width: "fit-content" }}
                      >
                        Продолжить
                      </StyledButton>
                    </>
                  ) : (
                    <>
                      <Heading
                        sx={{
                          fontSize: "18px",
                          fontWeight: "700",
                          lineHeight: "150%",
                        }}
                      >
                        У данного поста нет комментариев
                      </Heading>
                    </>
                  )}
                </Box>
              </PageLayout.Pane>
              <PageLayout.Content>
                <Box
                  sx={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.20)",
                    background: "#161A1D",
                    backdropFilter: "blur(50px)",
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {commentsData.length >= 50 ? (
                    <>
                      <Content data={commentsData.slice(0, 50)} />
                    </>
                  ) : (
                    <>
                      <Spinner sx={{ color: "white", mx: "auto" }} />
                    </>
                  )}
                </Box>
              </PageLayout.Content>
            </PageLayout>
            <Footer />
          </>
        ) : (
          <Box
            sx={{ width: "100%", display: "flex", alignItems: "center", py: 6 }}
          >
            <Spinner sx={{ color: "white", mx: "auto" }} />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default PaymentPage;
