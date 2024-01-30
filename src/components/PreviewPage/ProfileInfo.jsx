import { Avatar, Box, Text, ThemeProvider } from "@primer/react";
import React from "react";
import commentIcon from "../../assets/comment_icon.svg";

const ProfileInfo = ({ data }) => {
  return (
    <ThemeProvider>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Avatar
          crossOrigin="anonymous"
          size={"30"}
          src={`https://pg-proxy.sobo.dev/?url=${encodeURIComponent(
            data.caption.user.profile_pic_url
          )}`}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text sx={{ fontSize: "16px" }}>{data.caption.user.full_name}</Text>
          <Text
            sx={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.60)",
            }}
          >
            {data.caption.user.username}
          </Text>
        </Box>
      </Box>
      <img
        crossOrigin="anonymous"
        src={`https://pg-proxy.sobo.dev/?url=${encodeURIComponent(
          data.caption.url_img_post
        )}`}
        width={"60%"}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <img src={commentIcon} />
        <Text
          sx={{
            color: "rgba(255, 255, 255, 0.80)",
            fontSize: "16px",
            lineHeight: "150%",
          }}
        >
          {data.comment_count} комментариев
        </Text>
      </Box>
    </ThemeProvider>
  );
};

export default ProfileInfo;
