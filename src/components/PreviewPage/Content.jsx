import { Heading, ThemeProvider, themeGet } from "@primer/react";
import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  align-self: stretch;
  margin-top: 24px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #22272b;
  height: fit-content;
  font-family: ${themeGet("fonts.normal")};
  tbody {
    border-radius: 4px;
    max-height: 400px;
    overflow-y: auto;
  }
  tr {
    width: 100%;
    &:first-of-type {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    th,
    td {
      color: white;
      border: 1px solid #ffffff33;
      padding: 8px 12px;
      color: #fafafa;
      white-space: pre-line;
      &:first-of-type,
      &:nth-of-type(2),
      &:last-of-type {
        width: 115px;
      }
    }
    th {
      width: auto;
      font-size: 12px;
      font-weight: 600;
      line-height: 150%;
      letter-spacing: 0.12px;
      text-transform: uppercase;
      text-align: left;
      white-space: nowrap;
      &:first-of-type {
        border-top-left-radius: 4px;
      }
      &:last-of-type {
        border-top-right-radius: 4px;
      }
    }
    td {
      font-size: 14px;
      font-weight: 400;
      line-height: 140%;
    }
  }
`;

const Content = ({ data }) => {
  const timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000);
    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours().toString().padStart(2, "0");
    let min = a.getMinutes().toString().padStart(2, "0");
    let sec = a.getSeconds().toString().padStart(2, "0");
    let time =
      date + "." + month + "." + year + `\n` + hour + ":" + min + ":" + sec;
    return time;
  };
  return (
    <>
      <ThemeProvider>
        <Heading
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            lineHeight: "150%",
            color: "white",
            fontFamily: "normal",
          }}
        >
          Предпросмотр
        </Heading>
        <StyledTable
          sx={{
            fontFamily: "normal",
          }}
        >
          <thead>
            <tr>
              <th>date & time</th>
              <th>Username</th>
              <th>text</th>
              <th>likes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((comment, index) => {
              return (
                <tr key={index}>
                  <td>{timeConverter(comment.created_at)}</td>
                  <td>@{comment.user.username}</td>
                  <td>{comment.text}</td>
                  <td>{comment.comment_like_count}</td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </ThemeProvider>
    </>
  );
};

export default Content;
