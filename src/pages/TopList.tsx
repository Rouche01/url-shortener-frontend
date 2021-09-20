/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import UrlItem from "../components/UrlItem";
import { AppContext } from "../context/DataContext";
import { Container } from "./Home";
import format from "date-fns/format";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Heading = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 30px;
`;

const StyledLink = styled(Link)`
  color: palevioletred;
`;

const TopList = () => {
  const {
    state: { loading, topUrls },
    actions: { fetchTopUrls },
  } = useContext(AppContext);

  useEffect(() => {
    fetchTopUrls(100);
  }, []);

  // console.log(format(topUrls[0]?.createdDate, 'LLL dd, yyyy'))

  return (
    <Container>
      <StyledLink to="/">Back to shorten url</StyledLink>
      <Heading>Frequently Visited</Heading>
      {loading ? (
        <Loader color="palevioletred" size={100} />
      ) : (
        topUrls.map(({ createdDate, longUrl, shortUrl, hits, code }) => (
          <UrlItem
            key={code}
            createdTime={format(createdDate, "LLL dd, yyyy")}
            hits={hits}
            longUrl={longUrl}
            shortUrl={shortUrl}
          />
        ))
      )}
    </Container>
  );
};

export default TopList;
