import { ClipLoader } from "react-spinners";

export const Button = (props: { label: string; isLoading: boolean }) => {
  const { label, isLoading } = props;
  return (
    <button type="submit">
      {!isLoading ? (
        label
      ) : (
        <ClipLoader
          color={"white"}
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </button>
  );
};
