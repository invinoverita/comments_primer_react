import { Box, Heading, Text, ThemeProvider } from "@primer/react";
import React from "react";
import headerIcon from "../assets/header-icon.svg";

const Footer = () => {
  return (
    <>
      <ThemeProvider>
        <Box
          color={"rgba(255, 255, 255, 0.60)"}
          fontFamily={"normal"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          borderTop="1px solid rgba(255, 255, 255, 0.20)"
          sx={{ p: 3 }}
        >
          <Text>© 2023 GetComments. Все права защищены.</Text>
          <Box display={'flex'} sx={{ gap: "16px" }}>
            <Text>Политика конфиденциальности</Text>
            <Text>Условия использования</Text>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Footer;
