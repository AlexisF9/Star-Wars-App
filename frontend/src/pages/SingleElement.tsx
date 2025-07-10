import { useParams } from "react-router";
import NotFound from "./NotFound";

export default function SingleElement() {
  const params = useParams();
  console.log(params);

  if (params.id === "test") {
    return <NotFound />;
  }

  return (
    <>
      <ul>
        <li>{params.category}</li>
        <li>{params.id}</li>
      </ul>
    </>
  );
}
