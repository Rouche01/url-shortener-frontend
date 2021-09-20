/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { AppContext } from "../context/DataContext";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";

interface ButtonProps {
  primary?: boolean;
  marginRight?: number;
  marginLeft?: number;
  fontSize?: string;
}

export const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  margin-top: 70px;
  padding-bottom: 30px;
`;

const ErrorBox = styled.div`
  padding: 0.7rem;
  background-color: #ff9494;
  border-radius: 7px;
  margin-top: 15px;
  text-align: center;
  color: #680c07;
`;

const CopyBox = styled.div`
  padding: 0.4rem 0.7rem;
  border: 1px solid palevioletred;
  border-radius: 7px;
  /* max-width: 65%; */
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
`;

const Heading = styled.h1`
  font-size: xx-large;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
`;

const Spacer = styled.div`
  margin-top: 20px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const InputField = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 14px 18px;
  border-radius: 7px;
  border: 1px solid gray;
  font-size: 1.1rem;
  &:focus {
    outline: none;
    border-color: palevioletred;
  }
`;

const Button = styled.button<ButtonProps>`
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.1rem")};
  border-radius: 3px;
  border: 2px solid palevioletred;
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  margin-right: ${(props) => props.marginRight};
  margin-left: ${(props) => `${props.marginLeft}px`};
`;

const ShortCode = styled.p`
  font-size: 1rem;
  padding: 0;
  margin: 0;
`;

const Home: React.FC = () => {
  const [longUrl, setLongUrl] = useState<string>("");
  const [inputErr, setInputErr] = useState<string | null>(null);

  const {
    state: { shortUrl, error, loading },
    actions: { shortenUrl, clearError },
  } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) {
      timer = setTimeout(() => {
        clearError();
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setInputErr(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [inputErr]);

  const shortUrlRef = useRef<HTMLParagraphElement>(null);

  const handleUrlShorten = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (longUrl.length > 0) {
      await shortenUrl(longUrl);
    } else {
      setInputErr("The input box can't be empty");
    }
  };

  const navigateToTopUrl = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.preventDefault();
    history.push("/top-urls");
  };

  const handleCopy = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();
    navigator.clipboard.writeText(shortUrlRef.current?.textContent!);
    toast("Copied url", {
      type: "success",
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      hideProgressBar: true,
    });
  };

  return (
    <Container>
      <Heading>Create Short Links</Heading>
      <Form onSubmit={(ev) => handleUrlShorten(ev)}>
        <InputField
          placeholder="Enter Long URL"
          value={longUrl}
          onChange={(ev) => setLongUrl(ev.target.value)}
        />
        {shortUrl && (
          <CopyBox>
            <ShortCode ref={shortUrlRef}>{shortUrl}</ShortCode>
            <Button onClick={(ev) => handleCopy(ev)} primary fontSize="0.7rem">
              COPY
            </Button>
          </CopyBox>
        )}
        {(error || inputErr) && <ErrorBox>{error || inputErr}</ErrorBox>}
        <Spacer>
          <Flex>
            <Button
              style={{ display: "flex", alignItems: "center" }}
              type="submit"
              disabled={loading}
              primary
            >
              Create Link
              {loading && <Loader color="#FFF" size={25} ml={8} />}
            </Button>
            <Button onClick={(ev) => navigateToTopUrl(ev)} marginLeft={20}>
              Most Visited Links
            </Button>
          </Flex>
        </Spacer>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default Home;
