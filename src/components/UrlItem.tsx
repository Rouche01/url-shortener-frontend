import React, { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";

interface SubTextProps {
  fontSize?: string;
}

const UrlBox = styled.div`
  padding: 0.9rem 1.8rem;
  background-color: #f5f6f7;
  border-bottom: 1px solid #818387dd;
`;

const SubText = styled.p<SubTextProps>`
  color: #818387;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "0.75rem")};
`;

const SpanText = styled.span`
  font-weight: bold;
  color: palevioletred;
`;

const Text = styled.p`
  color: #35383b;
  font-size: 1.15rem;
  margin-top: -5px;
  margin-bottom: 10px;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Flex = styled.div`
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CopyButton = styled.button`
  font-size: 0.72rem;
  display: block;
  cursor: pointer;
  padding: 0.15rem 0.7rem;
  margin-left: 10px;
  color: palevioletred;
  border: 1px solid palevioletred;
  border-radius: 2px;
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

interface UrlItemProps {
  createdTime: string;
  longUrl: string;
  shortUrl: string;
  hits: number;
}

const UrlItem: React.FC<UrlItemProps> = ({
  createdTime,
  longUrl,
  shortUrl,
  hits,
}) => {
  const shortUrlRef = useRef<HTMLParagraphElement>(null);

  const handleCopy = () => {
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
    <>
      <UrlBox>
        <SubText
          style={{ textTransform: "uppercase" }}
        >{`CREATED AT ${createdTime}`}</SubText>
        <Text>{longUrl}</Text>
        <Flex>
          <Flex>
            <SubText ref={shortUrlRef} fontSize="0.85rem">
              {shortUrl}
            </SubText>
            <CopyButton onClick={handleCopy}>COPY</CopyButton>
          </Flex>
          <SubText fontSize="0.85rem">
            Visits: <SpanText>{hits}</SpanText>
          </SubText>
        </Flex>
      </UrlBox>
      <ToastContainer />
    </>
  );
};

export default UrlItem;
