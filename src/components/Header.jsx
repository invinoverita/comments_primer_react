import { Box, Heading, Text, ThemeProvider } from "@primer/react";
import React from "react";
import headerIcon from "../assets/header-icon.svg";

const Header = () => {
  return (
    <>
      <ThemeProvider>
        <Box
          bg={"rgba(246, 251, 253, 0.10)"}
          color={"#FAFAFA"}
          fontFamily={"normal"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderBottom="1px solid rgba(255, 255, 255, 0.20)"
          sx={{ backdropFilter: "blur(50px)" }}
        >
          <img src={headerIcon} />
          <Heading
            as="h1"
            sx={{ fontSize: 3, marginLeft: 1, my: 3, fontWeight: "bold" }}
          >
            GetComments
          </Heading>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Header;
