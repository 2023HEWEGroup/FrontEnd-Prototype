import styled from "styled-components";
import SaveInput from "./saveInput/SaveInput";
import UseDraft from "./useDraft/UseDraft";

const ExhibitCommands = () => {
  return (
    <SExhibitCommands>
      <BackToHome />
      <SaveInput />
      <UseDraft />
    </SExhibitCommands>
  );
};

const SExhibitCommands = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  pointer-events: none;
  gap: 15px;
  width: 100vw;
  padding: 15px;
`;

export default ExhibitCommands;
